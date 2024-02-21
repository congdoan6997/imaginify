"use server";

import { revalidatePath } from "next/cache";

import User from "../database/models/user.model";
import { connectToDatabase } from "../database/mongoose";
import { handleError } from "../utils";

//CREATE
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();
    await User.create(user);
    // revalidatePath("/");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

//READ
export async function getUserById(userId: string) {
  try {
    await connectToDatabase();
    const user = await User.findById({ clerkId: userId });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

//UPDATE
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();
    const updatedUser = await User.findByIdAndUpdate({ clerkId }, user, {
      new: true,
    });
    if (!updatedUser) throw new Error("User update failed");

    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

//DELETE
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const deletedUser = await User.findByIdAndDelete({ clerkId });
    if (!deletedUser) throw new Error("User deletion failed");
    revalidatePath("/");
    return JSON.parse(JSON.stringify(deletedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase();
    const updateUserCredits = await User.findByIdAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee } },
      { new: true }
    );

    if (!updateUserCredits) throw new Error("User credit update failed");

    return JSON.parse(JSON.stringify(updateUserCredits));
  } catch (error) {
    handleError(error);
  }
}
