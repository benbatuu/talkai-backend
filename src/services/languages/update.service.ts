import pc from '../../helpers/prismaclient.singleton';
import HttpStatusCode from '../../enums/httpstatuscode';
import { HTTPException } from 'hono/http-exception';

export const updateLanguageService = async (id: string, name: string, code: string) => {
    const existingLanguage = await pc.languages.findUnique({
        where: { id: id }
    });

    if (!existingLanguage) {
        throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'language_not_found' });
    }

    const isLanguageExist = await pc.languages.findFirst({
        where: {
            code: code,
            NOT: {
                id: id
            }
        }
    });

    if (isLanguageExist) {
        throw new HTTPException(HttpStatusCode.BAD_REQUEST, { message: 'language_already_exists' });
    }

    const updatedLanguage = await pc.languages.update({
        where: { id: id },
        data: {
            name: name,
            code: code
        }
    });

    if (!updatedLanguage) {
        throw new HTTPException(HttpStatusCode.INTERNAL_SERVER_ERROR, { message: 'language_update_failed' });
    }

    return {
        data: updatedLanguage,
        message: 'language_updated_successfully',
    };
}