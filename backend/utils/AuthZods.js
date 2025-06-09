const zod = require("zod")

const AdminSignupValidate = zod.object({
    isAdmin : zod.coerce.boolean(),
    name : zod.string().min(1),
    college : zod.string().min(1),
    hostel : zod.string().min(1),
    category : zod.string().min(1),
    position : zod.string().min(1),
    phone: zod.string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"), // Ensures phone number is exactly 10 digits
    email: zod.string().email("Invalid email format"),
    password: zod.string()
        .min(6, "Password must be at least 6 characters long"),
})

const UserSignupValidate = zod.object({
    isAdmin : zod.boolean(),
    name : zod.string().min(1),
    college : zod.string().min(1),
    hostel : zod.string().min(1),
    regNo: zod.string().min(1),
    phone: zod.string()
        .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"), // Ensures phone number is exactly 10 digits
    email: zod.string()
        .email("Invalid email format"),
    password: zod
        .string()
        .min(6, "Password must be at least 6 characters long"),
})

module.exports = {
    AdminSignupValidate : AdminSignupValidate,
    UserSignupValidate : UserSignupValidate,
}
