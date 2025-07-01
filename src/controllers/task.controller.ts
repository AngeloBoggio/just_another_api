import {Request, Response } from 'express';
import {Task} from '../interfaces/task.interface';

export const createTask = (req: Request, res: Response) => {
    const task: Task = req.body;
    console.log('New task:', task);
    // Here you would typically save to a database
    res.status(201).json({
        message: 'Task created successfully',
        task
    });
};

export const getTasks = (req: Request, res: Response) => {
    res.status(200).json({
        message: 'List of tasks will be returned here'
    });
}