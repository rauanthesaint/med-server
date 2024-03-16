import mongoose, { Schema, Document, Model } from 'mongoose';
import { isEmail } from 'validator';
import bcrypt from 'bcrypt';

interface UserDocument extends Document {
    email: string;
    password: string;
}

interface UserModel extends Model<UserDocument> {
    authenticate(email: string, password: string): Promise<UserDocument>;
}

const userSchema: Schema<UserDocument> = new mongoose.Schema(
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

userSchema.post('save', function (doc, next) {
    const { email } = doc;
    console.log('[server] User created:', email);
    next();
});

userSchema.pre('save', async function (next) {
    console.log('[server] Creating an user...');
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.authenticate = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        throw new Error('Failed to authenticate the user');
    }
    const isValid: boolean = await bcrypt.compare(password, user.password);
    if (isValid) {
        return user;
    }
    throw new Error('Failed to authenticate the user');
};

const User = mongoose.model<UserDocument, UserModel>('user', userSchema);

export { User };
