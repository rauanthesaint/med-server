import mongoose, { Schema, Model, Document } from 'mongoose';

// import { isEmail } from 'validator';
import bcrypt from 'bcrypt';

interface SpecialistDocument extends Document {
    id: number;
    name: string;
    specialty: string;
}

const specialistSchema: Schema<SpecialistDocument> = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },
        name: {
            type: String,
            required: true,
            lowercase: true,
        },
        specialty: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

specialistSchema.post('save', function (doc, next) {
    const { id } = doc;
    console.log('[server] Admin created:', id);
    next();
});

// specialistSchema.pre('save', async function (next) {
//     console.log('[server] Creating an admin...');
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// adminSchema.statics.authenticate = async function (email, password) {
//     const admin = await this.findOne({ email });
//     if (!admin) {
//         throw new Error('Failed to authenticate the admin');
//     }
//     const isValid: boolean = await bcrypt.compare(password, admin.password);
//     if (isValid) {
//         return admin;
//     }
//     throw new Error('Failed to authenticate the admin');
// };

const Specialist = mongoose.model<SpecialistDocument>(
    'specialist',
    specialistSchema
);

export { Specialist };
