import { Detail } from '../../models/Detail.js';
import { Maintype } from '../../models/Maintype.js';
import { Path } from '../../models/Path.js';
import { Tag } from '../../models/Tag.js';
import { User } from '../../models/User.js';
import { handleRecommend } from '../../python/recommend/index.js';
import { ERecommendStatus } from '../../types/index.js';

const checkStatus = async (request, reply) => {
    const userId = request.params.user_id;
    const userData = await User.findById(userId);
    const result = {
        status: (() => {
            switch (userData?.recommend?.length) {
                case 1:
                    return ERecommendStatus.DONE;
                case 2:
                    return ERecommendStatus.CHOOSEN;
                default:
                    return ERecommendStatus.FIRST_TIME;
            }
        })(),
        prediction: await (async () => {
            return await Promise.all(userData.recommend.map(async (recommendItem) => {
                const maintypeData = await Maintype.findById(recommendItem.maintype, { type_name: 1, _id: 1 });
                return {
                    maintype: maintypeData.type_name,
                    maintype_id: maintypeData._id,
                    percent: recommendItem.percent,
                };
            }));
        })(),
    };
    await reply.code(200).send(result);
};
const listTag = async (request, reply) => {
    const tags = await Tag.find({}, { tag_name: 1, _id: 1 });
    const result = tags.map((x) => x.tag_name);
    await reply.code(200).send(result);
};
const processRecommend = async (request, reply) => {
    const user = request.user;
    if (!user) {
        await reply.code(400).send('not found user');
        return;
    }
    const skills = request.body.skills;
    const prediction = await handleRecommend(skills)
        .then((success) => success.data.result.courses)
        .catch((error) => console.log(error));
    if (!prediction) {
        await reply.code(600).send('unknow');
        return;
    }
    const setRecommend = async () => {
        const maintypes = await Promise.all(prediction.map(async (type, index) => {
            const maintype_id = await Maintype.findOne({ type_name: type.maintype }, { _id: 1 });
            return {
                maintype_id: maintype_id?._id,
                index,
            };
        }));
        const recommends = prediction.map((type, index) => ({
            maintype: maintypes.at(index)?.maintype_id,
            percent: type.percent,
        }));
        await User.updateOne({ _id: user?._id }, { $set: { recommend: recommends } });
        return maintypes;
    };
    const setPath = async () => {
        await Promise.all(prediction.map(async (type) => {
            const [tagCompledteds, tagImportants] = await Promise.all([
                Tag.find({ tag_name: { $in: type.done } }, { _id: 1 }),
                Tag.find({ tag_name: { $in: type.recommend } }, { _id: 1 }),
            ]);
            const [detailCompleteds, detailImportants] = await Promise.all([
                Detail.find({ tag_id: { $in: tagCompledteds.map((x) => x._id) } }, { _id: 1 }),
                Detail.find({ tag_id: { $in: tagImportants.map((x) => x._id) } }, { _id: 1 }),
            ]);
            const newPath = new Path({
                user_id: user?._id,
                is_completed: detailCompleteds.map((x) => x._id),
                is_important: detailImportants.map((x) => x._id),
            });
            return await newPath.save();
        }));
    };
    const [recommendData] = await Promise.all([setRecommend(), setPath()]);
    const result = prediction.map((type, index) => ({
        maintype: type.maintype,
        maintype_id: recommendData.find((x) => x.index === index)?.maintype_id?._id,
        percent: Number(type.percent),
    }));
    await reply.code(200).send(result);
};
const chooseMaintype = async (request, reply) => {
    const choosen = request.query.choosen;
    const user = request.user;
    const result = await User.findByIdAndUpdate(user._id, {
        $pull: {
            recommend: {
                maintype: { $ne: choosen },
            },
        },
    });
    await reply.code(200).send(result);
};

export { checkStatus, chooseMaintype, listTag, processRecommend };
