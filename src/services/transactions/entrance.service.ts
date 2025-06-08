import pc from '../../helpers/prismaclient.singleton';
import { todayDateTime } from '../../helpers/functions';
import { HTTPException } from 'hono/http-exception';
import { env } from 'bun';
import HttpStatusCode from '../../enums/httpstatuscode';
import EntranceStatus from '../../enums/entranceStatuses';

export const createEntranceService = async (token: string, type: EntranceStatus, useragent: string | undefined, ipaddress: string | null, userid: string) => {
    const unHashToken = todayDateTime() + ':' + env.DATE_HASH_PASSWORD;
    const hasher = new Bun.SHA256();
    hasher.update(unHashToken);
    const hashedToken = hasher.digest('hex');

    if (hashedToken !== token) throw new HTTPException(400, { message: 'token_expired' });

    const userInfo = await pc.user.findFirstOrThrow({
        select: {
            lastentranceat: true,
            lastexitat: true,
        },
        where: {
            id: userid,
        },
    });

    if (type == EntranceStatus.ENTRANCE && new Date(userInfo.lastentranceat!) > new Date(userInfo.lastexitat!)) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'entrance_error' });

    if (type == EntranceStatus.EXIT && new Date(userInfo.lastentranceat!) < new Date(userInfo.lastexitat!)) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'exit_error' });

    const newEntrance = await pc.entrance.create({
        data: {
            type: type,
            useragent: useragent || '',
            ipaddress: ipaddress!,
            userid: userid,
        },
    });

    if (type == EntranceStatus.ENTRANCE)
        await pc.user.update({
            where: {
                id: newEntrance.userid,
            },
            data: {
                lastentranceat: new Date(),
            },
        });
    else if (type == EntranceStatus.EXIT)
        await pc.user.update({
            where: {
                id: newEntrance.userid,
            },
            data: {
                lastexitat: new Date(),
            },
        });

    if (!newEntrance) throw new HTTPException(400, { message: 'entrance_couldnt_createad' });

    return newEntrance;
};
