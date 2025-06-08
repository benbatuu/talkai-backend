import HttpStatusCode from 'enums/httpstatuscode';
import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';

export const createChatRoom = async (userId: string) => {
    const userData = await pc.user.findUnique({
        where: {
            id: userId,
        },
    });

    const newChatRoom = await pc.chatRoom.create({
        data: {
            userId: userId,
            id: crypto.randomUUID(),
            language: userData?.learningLanguage || 'en',
        },
    });

    if (!newChatRoom)
        throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, { message: 'Failed to create chat room' });


    return newChatRoom;
};