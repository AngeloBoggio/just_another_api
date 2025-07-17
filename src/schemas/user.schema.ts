import {Schema, model, Document} from 'mongoose';
import {IUser} from '../interfaces/user.interface';


const userSchema = new Schema<IUser>({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    tasks: [{type: Schema.Types.ObjectId, ref: 'Task'}],
}, {timestamps: true});

userSchema.pre('save', async function(next){
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function(candidatePassword: string) {
    return await compare(candidatePassword, this.password);
}

export default model<IUser>('User', userSchema);