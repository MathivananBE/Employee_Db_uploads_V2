import { z } from "zod";

export const createEmployeeSchema = z.object({
  empNo: z
  .string()
  .trim()
  .min(1, "Employee number is required")
  .max(20, "Employee number is too long")
  .regex(/^[A-Za-z0-9]+$/, "Employee number must be alphanumeric"),

  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(100)
    .regex(/^[A-Za-z ]+$/, "Only alphabets are allowed"),

  lastName: z
    .string()
    .trim()
    .min(1)
    .max(100)
    .regex(/^[A-Za-z ]+$/, "Only alphabets are allowed"),

  age: z
    .coerce
    .number()
    .int()
    .min(18, "Employee must be at least 18 years old")
    .max(60, "Employee must be at most 60 years old"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),


  password: z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(50, "Password must not exceed 50 characters")
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#])[A-Za-z\d@$!%*?&.#]+$/,
    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
  ),

  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

  department: z
    .string()
    .trim()
    .min(2)
    .max(50),

  designation: z
    .string()
    .trim()
    .min(2)
    .max(50),

  salary: z
    .coerce
    .number()
    .positive("Salary must be greater than 0")
    .max(10000000, "Salary seems unrealistically high"),

  gender: z.enum(["Male","male","Female","female", "Other"]),

 /*
  joiningDate: z
  .string()
  .regex(/^\d{2}-\d{2}-\d{4}$/, "Date must be in DD-MM-YYYY format")
  .transform((val, ctx) => {
    const [day, month, year] = val.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    // check if it's a real calendar date (e.g. rejects 31-02-2026)
    if (
      date.getFullYear() !== year ||
      date.getMonth() !== month - 1 ||
      date.getDate() !== day
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid calendar date",
      });
      return z.NEVER;
    }

    return date;
  })
  .refine((date) => date >= new Date("2000-01-01"), {
    message: "Joining date is too far in the past",
  })
  .refine((date) => date <= new Date(), {
    message: "Joining date cannot be in the future",
  }),
  
  */
  

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200),
});

export type CreateEmployeeInput = z.infer<typeof createEmployeeSchema>;