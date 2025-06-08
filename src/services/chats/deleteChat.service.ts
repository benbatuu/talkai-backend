import { HTTPException } from 'hono/http-exception';
import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'enums/httpstatuscode';

export const deleteChatService = async (userId: string, roomId: string) => {

    console.log(userId, roomId);

    const isExistChatRoom = await pc.chatRoom.findFirst({
        where: {
            id: roomId,
            userId: userId,
        },
    });

    if (!isExistChatRoom)
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'Chat room not found' });

    // First delete all messages in the chat room
    await pc.chat.deleteMany({
        where: {
            roomId: roomId
        }
    });

    // Then delete the chat room
    const deletedChatRoom = await pc.chatRoom.delete({
        where: {
            id: roomId
        }
    });

    if (!deletedChatRoom)
        throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, { message: 'Failed to delete chat room' });

    return {
        message: 'Chat room deleted successfully',
        chatRoom: deletedChatRoom,
    };
}
