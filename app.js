// Instrumentation måste laddas FÖRE alla andra imports så Sentry hinner
// hooka in i Node:s internals (HTTP, fetch, console). Detta är Sentrys
// rekommenderade mönster för ESM-appar.
import './instrument.js';

import { env } from 'node:process';
import * as Sentry from '@sentry/node';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import middleware from './middleware/index.js';

dotenv.config({ silent: true });

const port = env.PORT || 3000;
const app = express();

app.use(cookieParser());

app.get('/', (_request, response) => {
  response.status(404).send();
});

app.get('/auth', middleware.auth);
app.get('/callback', middleware.callback);

// Sentry error handler — måste registreras EFTER routes men FÖRE övriga
// error handlers. Fångar oväntade exceptions i request-pipelinen.
Sentry.setupExpressErrorHandler(app);

app.listen(port);
