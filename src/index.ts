import { env } from 'bun';
import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { verify as jwtverify } from 'hono/jwt';
import { cors } from 'hono/cors';
import { etag } from 'hono/etag';
import { secureHeaders } from 'hono/secure-headers';
import { HTTPException } from 'hono/http-exception';
import pc from './helpers/prismaclient.singleton';
// Controllers
import authController from './controllers/authController';
import userController from './controllers/userController';
import transactionController from './controllers/transactionController';
import rolesController from './controllers/rolesController';
import permissionsController from './controllers/permissionsController';
import notificationController from './controllers/notificationController';

// Enums
import HttpStatusCode from './enums/httpstatuscode';
import languageController from 'controllers/languageController';
import { jwtVerifyMiddleware } from 'middlewares/jwt.verify';
import subscriptionController from 'controllers/subscriptionController';
import { checkSubscriptionLimits } from 'middlewares/checkSubscriptionLimits';
import chatController from 'controllers/chatController';

const app = new Hono();

app.use('*', cors());
app.use('*', etag());
app.use('*', secureHeaders());

app.use('*', jwtVerifyMiddleware);
app.use('*', checkSubscriptionLimits);

app.use('*', async (c, next) => {
  logger();
  console.log(`[${c.req.method}] ${c.req.url}`);
  await next();
  c.header('X-Powered-By', 'DNA Tech');
  await pc.$disconnect();
});

app.notFound((c) => {
  return new Response(JSON.stringify({ error: { message: 'Not Found', route: c.req.path } }), {
    status: HttpStatusCode.NOT_FOUND,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

app.onError((err, c) => {
  if (err instanceof HTTPException)
    return new Response(JSON.stringify({ error: { message: err.message } }), {
      status: HttpStatusCode.BAD_REQUEST,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  console.log(err.message);
  return new Response(JSON.stringify({ error: { message: 'Internal Server Error', innerMessage: err.message } }), {
    status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    headers: {
      'Content-Type': 'application/json',
    },
  });
});

// Routes
app.get('/', async (c) => c.json({ data: 'OK' }));

app.route('/auth', authController);
app.route('/user', userController);
app.route('/role', rolesController);
app.route('/permission', permissionsController);
app.route('/transaction', transactionController);
app.route('/notification', notificationController);
app.route('/languages', languageController);
app.route('/subscriptions', subscriptionController);
app.route('/chats', chatController);

export default app;
