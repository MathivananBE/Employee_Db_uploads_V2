"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leads = void 0;
const typeorm_1 = require("typeorm");
const categories_1 = require("./categories");
const subCategory_1 = require("./subCategory");
let Leads = class Leads {
};
exports.Leads = Leads;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Leads.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "first_name", type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Leads.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_name", type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Leads.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 150, unique: true }),
    __metadata("design:type", String)
], Leads.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "country_code", type: "varchar", length: 5, default: "+91" }),
    __metadata("design:type", String)
], Leads.prototype, "countryCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "phone_number", type: "varchar", length: 15 }),
    __metadata("design:type", String)
], Leads.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], Leads.prototype, "project", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 150 }),
    __metadata("design:type", String)
], Leads.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "budget_range", type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Leads.prototype, "budgetRange", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "configuration_type", type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Leads.prototype, "configurationType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "property_type", type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Leads.prototype, "propertyType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => categories_1.Category, (category) => category.leads),
    (0, typeorm_1.JoinColumn)({ name: "category_id" }),
    __metadata("design:type", categories_1.Category)
], Leads.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => subCategory_1.SubCategory),
    (0, typeorm_1.JoinColumn)({ name: "subcategory_id" }),
    __metadata("design:type", subCategory_1.SubCategory)
], Leads.prototype, "subCategory", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "pan_card",
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Leads.prototype, "panCard", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "aadhar_card",
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Leads.prototype, "aadharCard", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "passport",
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Leads.prototype, "passport", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "driving_license",
        type: "varchar",
        length: 255,
        nullable: true,
    }),
    __metadata("design:type", Object)
], Leads.prototype, "drivingLicense", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: "is_active",
        type: "boolean",
        default: true,
    }),
    __metadata("design:type", Boolean)
], Leads.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], Leads.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], Leads.prototype, "updatedAt", void 0);
exports.Leads = Leads = __decorate([
    (0, typeorm_1.Entity)({ name: "Leads" })
], Leads);
exports.default = Leads;
