// controllers/userControllers.ts
import { Request, Response } from 'express';
import { User } from '../models/User';
import { createToken, MAX_AGE } from '../utils/jwt';

const registration /** POST */ = async (
    request: Request,
    response: Response
) => {
    const { email, password } = request.body;

    try {
        const user = await User.create({ email, password });
        const token = createToken(user.id);
        response.cookie('jwt', token, {
            httpOnly: true,
            maxAge: MAX_AGE * 1000,
        });
        response.status(201).json(user.id);
    } catch (error) {
        const message: string = `[server] ${error}`;
        const statusCode: number = 400;
        console.error(message);
        response.status(statusCode).json({
            message: message,
        });
    }
};

const authorization /** POST */ = async (
    request: Request,
    response: Response
) => {
    const { email, password } = request.body;
    try {
        const user = await User.authenticate(email, password);
        const token = createToken(user.id);
        response.cookie('jwt', token, {
            httpOnly: true,
            maxAge: MAX_AGE * 1000,
        });
        response.status(200).json(user.id);
    } catch (error) {
        const message: string = `[server] ${error}`;
        const statusCode: number = 400;
        console.error(message);
        response.status(statusCode).json({
            message: message,
        });
    }
};

export { registration, authorization };
