import mongoose from 'mongoose';
import mongoose_delete from 'mongoose-delete';

async function mongoServer() {
    mongoose.set('strictQuery', true);
    mongoose.plugin(mongoose_delete);
    await mongoose
        .connect(process.env.APT_ENDPOINT_MONGODB, {
        dbName: process.env.DATABASE,
    })
        .then(() => {
        console.log('connect to mongodb');
    });
    //   applySpeedGooseCacheLayer(mongoose, {
    //     redisUri: process.env.REDIS_URI,
    //     defaultTtl: 18000,
    //     debugConfig: {
    //       enabled: true,
    //       /** Optional: An array of mongoose models to debug, if not set then the debugger will log operations for all of the models */
    //       debugModels: ["iscv"],
    //       /** Optional: An array of operations to debug, if not set then the debugger will log all operations */
    //       debugOperations: [
    //         SpeedGooseDebuggerOperations.CACHE_QUERY,
    //         SpeedGooseDebuggerOperations.CACHE_CLEAR,
    //       ],
    //     },
    //   });
}

export { mongoServer };
