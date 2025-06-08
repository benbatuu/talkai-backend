import { HTTPException } from 'hono/http-exception';
import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'enums/httpstatuscode';

export const profileService = async (id: string) => {

    if (!id) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'user_id_required' });

    const isUserExists = await pc.user.findFirst({ where: { id: id } });
    if (!isUserExists) throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'user_not_found' });

    const userProfile = await pc.user.findFirst({
        where: { id: id },
        include: {
            userroles: {
                include: {
                    role: true
                }
            },
            userpermissions: {
                include: {
                    permission: true
                }
            },
            learningProgress: {
                include: {
                    language: true,
                }
            },
            chatRooms: {
                include: {
                    messages: true
                }
            },
            subscriptions: {
                include: {
                    package: true
                }
            }
        }
    });

    return userProfile;
};
