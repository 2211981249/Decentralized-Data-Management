const {z}=require("zod");



//creating an object Schema
const signupSchema=z.object({
    username:z
    .string({required_error:"Name is required"})
    .trim()
    .min(3,{message:"Name must be at least of 3 characters"})
    .max(255,{message:"Name must be more than 255 characters"}),


    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(5,{message:"email must be at least of 10 characters"})
    .max(40,{message:"email must be more than 20 characters"}),


    phone:z
    .string({required_error:"Phone number is required"})
    .trim()
    .min(10,{message:"Phone must be at least of 10 characters"})
    .max(10,{message:"Phone must be more than 10 characters"}),

    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(5,{message:"Password must be at least of 7 characters"})
    .max(1024,{message:"Password must be more than 1024 characters"}),
});

const loginSchema=z.object({
    email:z
    .string({required_error:"email is required"})
    .trim()
    .email({message:"Invalid email address"})
    .min(5,{message:"email must be at least of 10 characters"})
    .max(40,{message:"email must be more than 20 characters"}),


    password:z
    .string({required_error:"Password is required"})
    .trim()
    .min(5,{message:"Password must be at least of 7 characters"})
    .max(1024,{message:"Password must be more than 1024 characters"}),
})

module.exports={signupSchema,loginSchema};