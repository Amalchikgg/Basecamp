import express  from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation,  ProjectCreateValidation} from "./validations.js";
import { UserController, ProjectController } from "./Controller/index.js";
import cors from 'cors';
import { handleValidationErrors, checkAuth } from "./utils/index.js";

mongoose.connect('mongodb+srv://admin:wwwwww@cluster0.x6dpnsk.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login)
app.post('/auth/register', registerValidation, handleValidationErrors, UserController.register);
app.get('/auth/me', checkAuth, UserController.getMe);

app.get('/posts', ProjectController.getAll);
app.get('/posts/:id', ProjectController.getOne);
app.post('/posts', checkAuth, ProjectCreateValidation, handleValidationErrors, ProjectController.create);
app.delete('/posts/:id', checkAuth, ProjectController.remove);
app.patch('/posts/:id', checkAuth, postCreateValidation, handleValidationErrors, ProjectController.update);

app.listen(4444, (err) => {
    if(err) {
        return console.log(err);
    }

    console.log('Server OK');
}); 
