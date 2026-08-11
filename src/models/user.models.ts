import mongoose, { Model, model, models, Schema } from "mongoose";

export interface IUser extends Document {
    username: string,
    email: string,
    password: string
    isVerified: boolean,
    isAdmin: boolean,
    forgotPasswordToken: string | undefined,
    forgotPasswordTokenExpiry: Date | undefined,
    verifyToken: string | undefined,
    verifyTokenExpiry: Date | undefined
};

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        index: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        required: true,
        trim: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
});


const userModel: Model<IUser> = models.User || model<IUser>("User", userSchema);
export default userModel;
