import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from '../../enums/httpstatuscode';
import { HTTPException } from 'hono/http-exception';

export const getAllUsers = async (userid: number) => {
    const users = await pc.user.findMany({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            phone: true,
            email: true,
            status: true,
            createdat: true,
            lastloginat: true,
            lastexitat: true,
            lastentranceat: true,
            password: true,
            userpermissions: {
                select: {
                    permission: {
                        select: {
                            id: true,
                            name: true,
                            description: true,
                        },
                    },
                },
            },
            userroles: {
                select: {
                    role: {
                        select: {
                            id: true,
                            name: true,
                            rolepermissions: {
                                select: {
                                    permission: {
                                        select: {
                                            id: true,
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            subscriptions: {
                include: {
                    package: true
                }
            },
            chats: true,
        },
        orderBy: {
            id: 'asc',
        },
    });
    if (!users) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'no_users_found' });

    return { data: users, message: 'users_successfully_listed' };
};
