import {Document, Types} from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string; // should be hashed
    tasks: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;

    comparePassword(candidatePassword: string): Promise<boolean>;
}
