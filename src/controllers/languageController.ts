import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import pc from '../helpers/prismaclient.singleton';
import checkPermission from 'helpers/checkPermission';
// Enums
import HttpStatusCode from '../enums/httpstatuscode';
// Services
import { createLanguageService } from 'services/languages/create.service';
import { updateLanguageService } from 'services/languages/update.service';

const languageController = new Hono();

languageController.get('/', checkPermission(["languages:getall"]), async (c) => {
    const allLanguagesResponse = await pc.languages.findMany();
    if (!allLanguagesResponse) throw new HTTPException(HttpStatusCode.NOT_FOUND, { message: 'no_languages_found' });
    return c.json(allLanguagesResponse);
});

languageController.post('/', checkPermission(["languages:create"]), async (c) => {
    const { name, code } = await c.req.json();
    const createdLanguage = await createLanguageService(name, code);
    return c.json(createdLanguage);
});

languageController.put('/:id', checkPermission(["languages:update"]), async (c) => {
    const { id } = c.req.param();
    const { name, code } = await c.req.json();
    const updateLanguageResponse = await updateLanguageService(id, name, code);
    return c.json(updateLanguageResponse);
});

export default languageController;