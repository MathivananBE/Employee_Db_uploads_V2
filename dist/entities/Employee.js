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
exports.EmployeesDetails = void 0;
const typeorm_1 = require("typeorm");
let EmployeesDetails = class EmployeesDetails {
};
exports.EmployeesDetails = EmployeesDetails;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], EmployeesDetails.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ name: "emp_no", type: "varchar", length: 30, unique: true }),
    __metadata("design:type", String)
], EmployeesDetails.prototype, "empNo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "first_name", type: "varchar", length: 100 }),
    __metadata("design:type", String)
], EmployeesDetails.prototype, "firstName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "last_name", type: "varchar", length: 100 }),
    __metadata("design:type", String)
], EmployeesDetails.prototype, "lastName", void 0);
__decorate([
    (0, typeorm_1.Index)({ unique: true }),
    (0, typeorm_1.Column)({ type: "varchar", length: 150, unique: true }),
    __metadata("design:type", String)
], EmployeesDetails.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 255, nullable: true, }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int" }),
    __metadata("design:type", Number)
], EmployeesDetails.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 20, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], EmployeesDetails.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], EmployeesDetails.prototype, "designation", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "numeric", precision: 12, scale: 2 }),
    __metadata("design:type", Number)
], EmployeesDetails.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "date_of_joining", type: "date", default: () => "CURRENT_DATE" }),
    __metadata("design:type", String)
], EmployeesDetails.prototype, "dateOfJoining", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "address", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "marksheet_10", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "marksheet10", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "marksheet_11", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "marksheet11", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "marksheet_12", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "marksheet12", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "college_marksheet", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "collegeMarksheet", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "aadhar_card", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "aadharCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "pan_card", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "panCard", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "bank_book", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "bankBook", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "provisional_certificate", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "provisionalCertificate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "course_certificate", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "courseCertificate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "resume", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "resume", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "passport_photo", type: "varchar", length: 255, nullable: true }),
    __metadata("design:type", Object)
], EmployeesDetails.prototype, "passportPhoto", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "is_active", type: "boolean", default: true }),
    __metadata("design:type", Boolean)
], EmployeesDetails.prototype, "isActive", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    __metadata("design:type", Date)
], EmployeesDetails.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    __metadata("design:type", Date)
], EmployeesDetails.prototype, "updatedAt", void 0);
exports.EmployeesDetails = EmployeesDetails = __decorate([
    (0, typeorm_1.Entity)({ name: "employeesDetails" }),
    (0, typeorm_1.Check)(`"age" > 18`),
    (0, typeorm_1.Check)(`"salary" >= 0`)
], EmployeesDetails);
exports.default = EmployeesDetails;
