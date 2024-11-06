import { pubClient } from '../app.js';
import { ERole } from '../types/index.js';
import { removeUndefinedProps } from '../utils/removeUndefinedProps.js';

let record = undefined;
const init = async () => {
    record = String(process.env.SOCKET_POOL);
    const raw = await pubClient.get(record);
    if (raw)
        return;
    await pubClient.set(record, JSON.stringify({}));
};
const find = async (key, role) => {
    const data = await getter();
    return data?.[role + '_' + key] || undefined;
};
const findBySocket = async (socket) => {
    const data = await getter();
    let id = undefined;
    for (const [key, value] of Object.entries(data)) {
        if (value.socketIds.includes(socket)) {
            id = key;
            break;
        }
    }
    if (id === undefined)
        return undefined;
    return (data?.[id] || undefined);
};
const findUserIdBySocket = async (socket) => {
    const data = await getter();
    for (const [key, value] of Object.entries(data)) {
        if (value.socketIds.includes(socket)) {
            return Number(key.replace(ERole.EMPLOYEE, '').replace(ERole.BUSINESS, '').replace('_', ''));
        }
    }
    return undefined;
};
const getter = async () => {
    const raw = await pubClient.get(record);
    if (!raw)
        return;
    const data = JSON.parse(raw);
    return data;
};
const get = async (key, role) => {
    const raw = await pubClient.get(record);
    if (!raw)
        return;
    const data = JSON.parse(raw);
    if (!data)
        return;
    return data[key + '_' + role];
};
const add = async (id, socket, role) => {
    const data = await getter();
    const key = id + '_' + role;
    if (!data)
        return;
    if (!data[key])
        data[key] = {
            role,
            socketIds: [socket],
        };
    const temp = data[key].socketIds;
    if (!temp.includes(socket)) {
        data[key].socketIds.push(socket);
        data[key].role = role;
    }
    const result = JSON.stringify(removeUndefinedProps(data));
    await pubClient.set(record, result);
};
const remove = async (id, role) => {
    const key = id + '_' + role;
    const data = await getter();
    if (!data || !data?.[key])
        return;
    data[key] = undefined;
    const result = JSON.stringify(removeUndefinedProps(data));
    await pubClient.set(record, result);
};
const removeSocket = async (id, role) => {
    const key = id + '_' + role;
    const data = await getter();
    if (!data || !data?.[key])
        return;
    Object(data)[key].socket = undefined;
    const result = JSON.stringify(data);
    await pubClient.set(record, result);
};
var socketblock = {
    getter,
    get,
    add,
    remove,
    init,
    removeSocket,
    find,
    findBySocket,
    findUserIdBySocket,
};

export { socketblock as default };
