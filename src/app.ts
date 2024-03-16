// app.ts
import express, { Express, Request, Response } from 'express';
import mongoose from 'mongoose';

import ConfigService from './config/config.class';
import { router } from './routes/routes';

// TODO: reorganize the code
import cookieParser from 'cookie-parser';
// Application configuration
const configService = new ConfigService();
const PORT = configService.get('PORT') || 3000;
const URI = `mongodb+srv://${configService.get(
    'DATABASE_CREDENTIALS_USERNAME'
)}:${configService.get(
    'DATABASE_CREDENTIALS_PASSWORD'
)}@med-cluster.rjlkzj9.mongodb.net/med?retryWrites=true&w=majority&appName=med-cluster`;
const application: Express = express();
// Database
mongoose
    .connect(URI)
    .then(() => console.log('[server] Database connection status: 1'))
    .catch(() => {
        console.error('[server] Database connection status: 0');
    });
// Middleware
application.use(express.json());
application.use('/api', router);
application.use(cookieParser());
// Application launching
application.listen(PORT, () => {
    console.log(
        `[server] Server building status: 1.\nhttp://localhost:${PORT}`
    );
});
