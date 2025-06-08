import { env } from 'bun';
import { Hono } from 'hono';
import { verify as jwtverify } from 'hono/jwt';
import { createChatViaText } from 'services/chats/createChat.service';
import { createChatRoom } from 'services/chats/createChatRoom.service';
import { deleteChatService } from 'services/chats/deleteChat.service';
import { getSingleChatRoomService } from 'services/chats/getSingleChat.service';

const chatController = new Hono();

chatController.post('/', async (c) => {
    const { message, roomId } = await c.req.json();
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const chatResponse = await createChatViaText(userID, message, roomId);
    return c.json(chatResponse);
})

chatController.delete('/', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const body = await c.req.json();
    const deleteChatResponse = await deleteChatService(userID, body.roomId);
    return c.json(deleteChatResponse);
});

chatController.get('/:roomId', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const roomId = c.req.param('roomId');
    const singleChatResponse = await getSingleChatRoomService(userID, roomId);
    return c.json(singleChatResponse);
});

chatController.post('/room', async (c) => {
    const token = c.req.header(env.JWT_HEADER_NAME!)!.split(' ')[1];
    const jwtPayload = await jwtverify(token, env.JWT_SECRET!);
    const userID = jwtPayload.sub_id;
    const createChatRoomResponse = await createChatRoom(userID);
    return c.json(createChatRoomResponse);
});

export default chatController;