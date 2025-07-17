import Task from '../models/task.model';
import User from '../models/user.model';

const createTask = async(userId: string, taskData: Partial<Task>) => {
    const task = new Task({
        ...taskData,
        userId,
    });
    return await task.save();
}

const getUserWithTasks = async(userId: string) => {
    const user = await User.findById(userId).populate('tasks');
    const tasks = await Task.find({userId});
    return {user, tasks};
}