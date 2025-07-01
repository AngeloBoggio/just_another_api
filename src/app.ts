import express from 'express';
import taskRoutes from './routes/task.routes';

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/tasks', taskRoutes);

app.get('/', (req,res) => {
    res.send('Welcome to the task API');
});

export default app;
