import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../../enums/httpstatuscode';

export const readAllNotifications = async (userID: string) => {
    const notifications = await pc.notification.updateMany({
        where: {
            touserid: userID,
        },
        data: {
            readedat: new Date(),
        },
    });

    if (!notifications) {
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'no_notification_found' });
    }
    return notifications;
};

export const readNotification = async (id: string, userID: string) => {
    const notifications = await pc.notification.updateMany({
        where: {
            touserid: userID,
            id: id,
        },
        data: {
            readedat: new Date(),
        },
    });

    return notifications;
};
