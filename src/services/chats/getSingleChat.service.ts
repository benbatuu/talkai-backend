import { HTTPException } from 'hono/http-exception';
import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'enums/httpstatuscode';

export const getSingleChatRoomService = async (userId: string, roomId: string) => {
    const chatRoom = await pc.chatRoom.findFirst({
        where: {
            id: roomId,
            userId: userId,
        },
        include: {
            messages: {
                orderBy: {
                    createdAt: 'asc',
                },
            },
        },
    });

    if (!chatRoom) {
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'Chat room not found' });
    }

    return chatRoom;
}