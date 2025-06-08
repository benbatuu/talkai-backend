import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from 'enums/httpstatuscode';
import { HTTPException } from 'hono/http-exception';

export const createLanguageService = async (name: string, code: string) => {

    const isLanguageExist = await pc.languages.findFirst({
        where: {
            code: code
        }
    })

    if (isLanguageExist) throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'language_already_exists' });

    const createdLanguage = await pc.languages.create({
        data: {
            name: name,
            code: code
        }
    });
    if (!createdLanguage) throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, { message: 'language_creation_failed' });
    return {
        data: createdLanguage,
        message: 'language_created_successfully',
    };
}