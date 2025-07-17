import { Document, Types } from 'mongoose';

export interface Task extends Document {
    taskName: string;
    taskDate: string;
    taskDescription: string;
    userId: Types.ObjectId;
}
