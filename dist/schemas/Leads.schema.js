"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLeadSchema = void 0;
const zod_1 = require("zod");
exports.createLeadSchema = zod_1.z.object({
    firstName: zod_1.z
        .string()
        .trim()
        .min(3, "First name must be at least 3 characters")
        .max(100)
        .regex(/^[A-Za-z ]+$/, "Only alphabets are allowed"),
    lastName: zod_1.z
        .string()
        .trim()
        .min(1, "Last name is required")
        .max(100)
        .regex(/^[A-Za-z ]+$/, "Only alphabets are allowed"),
    email: zod_1.z
        .string()
        .trim()
        .toLowerCase()
        .email("Invalid email address"),
    countryCode: zod_1.z
        .string()
        .trim()
        .regex(/^\+\d{1,4}$/, "Invalid country code (e.g. +91)"),
    phoneNumber: zod_1.z
        .string()
        .trim()
        .regex(/^[6-9]\d{9}$/, "Invalid phone number"),
    project: zod_1.z
        .string()
        .trim()
        .min(2, "Project name must be at least 2 characters")
        .max(100, "Project name is too long"),
    location: zod_1.z
        .string()
        .trim()
        .min(2, "Location must be at least 2 characters")
        .max(100, "Location is too long"),
    budgetRange: zod_1.z
        .string()
        .trim()
        .min(2, "Budget range is required")
        .max(50, "Budget range is too long"),
    configurationType: zod_1.z
        .string()
        .trim()
        .min(2, "Configuration type is required")
        .max(50, "Configuration type is too long"),
    propertyType: zod_1.z
        .enum([
        "Apartment",
        "Villa",
        "Plot",
        "Independent House",
        "Commercial",
        "Other",
    ], {
        errorMap: () => ({
            message: "Invalid property type",
        }),
    }),
});
