import HttpStatusCode from "enums/httpstatuscode";
import { HTTPException } from "hono/http-exception";
import { verify as jwtverify } from 'hono/jwt';
import { env } from 'bun';
import { MiddlewareHandler } from "hono";

export const jwtVerifyMiddleware: MiddlewareHandler = async (c, next) => {
    if (c.req.path !== '/auth/authorize' && c.req.path !== '/' && c.req.path !== '/auth/refreshtoken') {
        if (!c.req.header(env.JWT_HEADER_NAME!)) throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });

        const header = c.req.header(env.JWT_HEADER_NAME!)!;

        if (!header.startsWith(`${env.JWT_TOKEN_TYPE} `)) throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });

        const token = await jwtverify(header.split(' ')[1], env.JWT_SECRET!);

        if ((c.req.path === '/auth/login' && token.tokentype !== env.AUTH_TOKEN_TYPE) || (c.req.path !== '/auth/login' && token.tokentype !== env.LOGIN_TOKEN_TYPE)) {
            throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: env.INVALID_AUTH_MESSAGE });
        }

        /*const revokedToken = await prisma.revokedtoken.count({ where: { token: token } });
        if (revokedToken > 0) throw new HTTPException(400, { message: env.INVALID_AUTH_MESSAGE });*/
    }
    await next();
};
