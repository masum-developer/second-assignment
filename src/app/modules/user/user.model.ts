import { Schema, model } from 'mongoose';
import { TAddress, TFullName, TOrders, TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt'
import config from '../../config';

const fullNameSchema = new Schema<TFullName>({
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
const addressSchema = new Schema<TAddress>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
});

const ordersSchema = new Schema<TOrders>({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
});

const userSchema = new Schema<TUser, UserModel>({
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
    isDeleted: {
        type: Boolean,
        default: false
    }
});

userSchema.pre('save', async function (next) {

    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this
    //hash password
    user.password = await bcrypt.hash(user.password, Number(config.bcrypt_salt_rounds))
    next()
})
userSchema.post('save', function (doc, next) {
    doc.password = ''
    // password empty
    next()
})

// Query Middleware
userSchema.pre('find', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})
userSchema.pre('findOne', function (next) {
    this.find({ isDeleted: { $ne: true } })
    next()
})
userSchema.pre('aggregate', function (next) {
    this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
    next()
})

// creating custom static method
userSchema.statics.isUserExists = async function (userId: number) {
    const existingUser = await User.findOne({ userId })
    return existingUser;
}

userSchema.statics.isUserNameExists = async function (username: string) {
    const existingUser = await User.findOne({ username })
    return existingUser;
}


export const User = model<TUser, UserModel>('User', userSchema);


