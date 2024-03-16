import jwt from 'jsonwebtoken';

export const MAX_AGE: number = 7 * 3600 * 24;

export const createToken = (id: string) => {
    return jwt.sign(
        { id },
        '2247ecaff43bb8fb963b3a09c6ddba7ad0c454e2950d21051374800a9c808017',
        {
            expiresIn: MAX_AGE,
        }
    );
};
