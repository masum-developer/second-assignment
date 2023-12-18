import { z } from "zod";
const fullNameValidationSchema = z.object({
    firstName: z.string().min(1).max(15).refine((value) => {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
    }, {
        message: "First name should be in capitalize format"
    }),
    lastName: z.string().min(1).max(15),
});


const addressValidationSchema = z.object({
    street: z.string(),
    city: z.string(),
    country: z.string(),
});


const ordersValidationSchema = z.object({
    productName: z.string(),
    price: z.number(),
    quantity: z.number(),
});


const userValidationSchema = z.object({
    userId: z.number(),
    username: z.string(),
    password: z.string(),
    fullName: fullNameValidationSchema,
    age: z.number(),
    email: z.string().email({ message: "Invalid email address" }),
    isActive: z.boolean().default(false),
    hobbies: z.array(z.string()).min(1),
    address: addressValidationSchema,
    orders: z.array(ordersValidationSchema).optional(),
});

export default userValidationSchema;