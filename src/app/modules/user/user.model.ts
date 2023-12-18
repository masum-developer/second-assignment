import { Schema, model } from 'mongoose';
import { IAddress, IFullName, IOrders, IUser } from './user.interface';

const fullNameSchema = new Schema<IFullName>({
    firstName: {
        type: String,
        required: [true, 'First Name Required'],
        trim: true,
        maxlength: [15, 'First Name cannot be more than 15'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name Required'],
        trim: true,
        maxlength: [15, 'Last Name cannot be more than 15']
    },
});
const addressSchema = new Schema<IAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const ordersSchema = new Schema<IOrders>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const userSchema = new Schema<IUser>({
    userId: { type: Number, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: {
        type: fullNameSchema,
        required: true
    },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    isActive: {
        type: Boolean,
        default: false,
    },
    hobbies: { type: [String], required: true },
    address: { type: addressSchema, required: true },
    orders: { type: [ordersSchema] },
});

export const User = model<IUser>('User', userSchema);
