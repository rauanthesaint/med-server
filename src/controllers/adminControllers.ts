// controllers/adminControllers.ts
import { Request, Response } from 'express';
import { Admin } from '../models/Admin';
import { Specialist } from '../models/Specialist';
import { createToken, MAX_AGE } from '../utils/jwt';

const registrationAdmin /** POST */ = async (
    request: Request,
    response: Response
) => {
    const { email, password } = request.body;

    try {
        const user = await Admin.create({ email, password });
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

const authorizationAdmin /** POST */ = async (
    request: Request,
    response: Response
) => {
    const { email, password } = request.body;
    try {
        const user = await Admin.authenticate(email, password);
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

const addSpecialist /** POST */ = async (
    request: Request,
    response: Response
) => {
    const { id, name, specialty } = request.body;
    try {
        const specialist = await Specialist.create({ id, name, specialty });
        response.status(201).json(specialist.id);
    } catch (error) {
        const message: string = `[server] ${error}`;
        const statusCode: number = 400;
        console.error(message);
        response.status(statusCode).json({
            message: message,
        });
    }
};

export { registrationAdmin, authorizationAdmin, addSpecialist };
