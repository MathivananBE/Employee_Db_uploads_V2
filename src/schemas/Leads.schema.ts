import { z } from "zod";

export const createLeadSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(3, "First name must be at least 3 characters")
    .max(100)
    .regex(/^[A-Za-z ]+$/, "Only alphabets are allowed"),

  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(100)
    .regex(/^[A-Za-z ]+$/, "Only alphabets are allowed"),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Invalid email address"),

  phoneNumber: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid phone number"),

  project: z
    .string()
    .trim()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name is too long"),

  location: z
    .string()
    .trim()
    .min(2, "Location must be at least 2 characters")
    .max(100, "Location is too long"),

  budgetRange: z
    .string()
    .trim()
    .min(2, "Budget range is required")
    .max(50, "Budget range is too long"),

  configurationType: z
    .string()
    .trim()
    .min(2, "Configuration type is required")
    .max(50, "Configuration type is too long"),

  propertyType: z
    .enum(
      [
        "Apartment",
        "Villa",
        "Plot",
        "Independent House",
        "Commercial",
        "Other",
      ],
      {
        errorMap: () => ({
          message: "Invalid property type",
        }),
      }
    ),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;