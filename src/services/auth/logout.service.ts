import pc from '../../helpers/prismaclient.singleton';
import { HTTPException } from 'hono/http-exception';
import HttpStatusCode from '../../enums/httpstatuscode';

export const logoutService = async (accesstoken: string, token: string, userid: string) => {
    const refreshtoken = await pc.refreshtoken.findFirst({
        where: {
            token: token,
            userid: userid,
        },
    });

    if (!refreshtoken) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'invalid_refresh_token' });

    await pc.revokedtoken.create({
        data: {
            token: accesstoken,
        },
    });

    await pc.refreshtoken.deleteMany({
        where: {
            token: token,
            userid: userid,
        },
    });

    return true;
};
