import { Schema, model } from 'mongoose';
import { IAddress, IFullName, IOrders, IUser } from './user.interface';

const fullNameSchema = new Schema<IFullName>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
})
const addressSchema = new Schema<IAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
})

const ordersSchema = new Schema<IOrders>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true }
})

const userSchema = new Schema<IUser>({
    userId: { type: Number, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    fullName: fullNameSchema,
    age: { type: Number },
    email: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    hobbies: { type: [String], required: true },
    address: addressSchema,
    orders: [ordersSchema]
});

export const User = model<IUser>('User', userSchema);