import { Schema, models, model } from "mongoose";

const TransactionSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  plan: { type: String },
  credits: { type: Number },
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
});

const Transaction =
  models?.Transaction || model("Transaction", TransactionSchema);

export default Transaction;
