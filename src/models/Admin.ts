import mongoose, { Schema, Model, Document } from 'mongoose';

import { isEmail } from 'validator';
import bcrypt from 'bcrypt';

interface AdminDocument extends Document {
    email: string;
    password: string;
}

interface AdminModel extends Model<AdminDocument> {
    authenticate(email: string, password: string): Promise<AdminDocument>;
}

const adminSchema: Schema<AdminDocument> = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            validate: isEmail,
        },
        password: {
            type: String,
            required: true,
            minlength: 8,
        },
    },
    {
        timestamps: true,
    }
);

adminSchema.post('save', function (doc, next) {
    const { email } = doc;
    console.log('[server] Admin created:', email);
    next();
});

adminSchema.pre('save', async function (next) {
    console.log('[server] Creating an admin...');
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

adminSchema.statics.authenticate = async function (email, password) {
    const admin = await this.findOne({ email });
    if (!admin) {
        throw new Error('Failed to authenticate the admin');
    }
    const isValid: boolean = await bcrypt.compare(password, admin.password);
    if (isValid) {
        return admin;
    }
    throw new Error('Failed to authenticate the admin');
};

const Admin = mongoose.model<AdminDocument, AdminModel>('admin', adminSchema);

export { Admin };
