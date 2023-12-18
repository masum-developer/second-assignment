import { Model } from "mongoose";

//import { Schema, model, connect } from 'mongoose';
export type TFullName = {
    firstName: string;
    lastName: string;
};

export type TAddress = {
    street: string;
    city: string;
    country: string;
};

export type TOrders = {
    productName: string;
    price: number;
    quantity: number;
};

export type TUser = {
    userId: number;
    username: string;
    password: string;
    fullName: TFullName;
    age: number;
    email: string;
    isActive: true | false;
    hobbies: string[];
    address: TAddress;
    orders?: TOrders[];
};

// for creating static

export interface UserModel extends Model<TUser> {
    isUserExists(userId: number): Promise<TUser | null>;
}


