import express from 'express';
import taskRoutes from './routes/task.routes';
import {body, param, validationResult, query} from 'express-validator';

const validateName = [
    param('name')
        .trim()
        .isLength({min: 3, max: 20}).withMessage('Name must be between 3-20 characters')
        .matches(/^[A-Za-z\s]+$/).withMessage('Name must contain only letters and spaces')
        .escape()
];

const app = express();
app.use(express.json());

app.get('/api/hello/:name', validateName, (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array().map(err => err.msg)});
    }

    const name = req.params.name;
    res.json({ message: `Hello ${name}!`,
    timestamp: new Date().toISOString()});
});

app.get('/api/hello', [
    query('firstName')
        .optional()
        .trim()
        .isLength({min: 3, max: 20}),
    query('lastName')
        .optional()
        .trim()
        .isLength({min: 3, max: 20})
], (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array().map(err => err.msg)});
    }

    const {firstName, lastName} = req.query;

    if(firstName && lastName){
        return res.json({
            message: `Hello ${firstName} ${lastName}!`,
            timestamp: new Date().toISOString()
        });
    }

    res.json({message: 'Hello, stranger!'});
});

const validateTitle = [
    param('title')
        .trim()
        .isIn(['Mr', 'Mrs', 'Ms', 'Dr', 'Prof'])
        .withMessage('Title must be Mr, Mrs, Ms, Dr, or Prof')
]

app.get('/greet/:title', validateTitle, [
    query('firstName')
        .trim()
        .isLength({min: 3, max:20}),
    query('lastName')
        .trim()
        .isLength({min: 3, max:20})
], (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors: error.array().map(err => err.msg)});
    }

    const {firstName, lastName} = req.query;
    const title = req.params.title;
    res.json({message: `Hello ${title} ${firstName} ${lastName}`});
})

// TODO: Create a POST /register endpoint that:
// 1. Validates:
//    - email: must be a valid email
//    - password: min 8 chars, at least 1 number and 1 letter
//    - confirmPassword: must match password
//    - age: must be 18 or older
// 2. If validation passes, return a success message with the user data (without the password)
// 3. If validation fails, return appropriate error messages

// Example valid request body:
// {
//   "email": "user@example.com",
//   "password": "password123",
//   "confirmPassword": "password123",
//   "age": 25
// }
const validateRegister = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Email must be a valid email'),
    body('password')
        .trim()
        .isLength({min: 8})
        .withMessage('Password must be at least 8 characters long')
        .matches(/\d/)  // At least one number
        .withMessage('Password must contain at least one number')
        .matches(/[a-zA-Z]/)  // At least one letter
        .withMessage('Password must contain at least one letter'),
    body('confirmPassword')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match');
            }
            return true;
        }),
    body('age')
        .trim()
        .isInt({min: 18})
        .withMessage('Age must be 18 or older')
]

app.post('/register', validateRegister, (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.json({message: "Validation failed", 
            errors: errors.array().map(err => err.msg)
        })
    }
    const {email, password, confirmPassword, age} = req.body;
    return res.json({message: "User registered successfully", user: {email, age}})
})

app.get('/', (req,res) => {
    res.send('Welcome to the task API');
});

export default app;
