import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
/*
    -Schema defines the structure of documents in a mongodb collection
    -model creates a model from the schema
    -A document is a mongoose document, which is an instance of a model
*/

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: {type: Schema.Types.ObjectId, ref: 'Task'},
  },
  { timestamps: true }
);

// Add method to compare password
userSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

const User = model<Document>("User", userSchema);

export default User;
