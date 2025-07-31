import {Schema, model} from 'mongoose';
import {Task as ITask} from '../interfaces/task.interface';

const taskSchema = new Schema<ITask>({
    taskName: { type: String, required: true},
    taskDate: { type: String, required: true},
    taskDescription: { type: String},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const Task = model<ITask>('Task', taskSchema);

export default Task;
