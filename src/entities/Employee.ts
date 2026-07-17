import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  Check,
} from "typeorm";

@Entity({ name: "employeesDetails" })
@Check(`"age" > 18`)
@Check(`"salary" >= 0`)
export class EmployeesDetails {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column({ name: "emp_no", type: "varchar", length: 30, unique: true })
  empNo!: string;

  @Column({ name: "first_name", type: "varchar", length: 100 })
  firstName!: string;

  @Column({ name: "last_name", type: "varchar", length: 100 })
  lastName!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 150, unique: true })
  email!: string;

  @Column({type: "varchar",length: 255,nullable: true,})
  password?: string | null;

  @Column({ type: "varchar", length: 20, nullable: true })
  phone?: string | null;

  @Column({ type: "int" })
  age!: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  gender?: string | null;

  @Column({ type: "varchar", length: 100 })
  department!: string;

  @Column({ type: "varchar", length: 100 })
  designation!: string;

  @Column({ type: "numeric", precision: 12, scale: 2 })
  salary!: number;

  @Column({ name: "date_of_joining", type: "date", default: () => "CURRENT_DATE" })
  dateOfJoining!: string;

  @Column({ type: "text", nullable: true })
  address?: string | null;

  // --- Document file paths (stored like address, just paths instead of free text) ---
  @Column({ name: "marksheet_10", type: "varchar", length: 255, nullable: true })
  marksheet10?: string | null;

  @Column({ name: "marksheet_11", type: "varchar", length: 255, nullable: true })
  marksheet11?: string | null;

  @Column({ name: "marksheet_12", type: "varchar", length: 255, nullable: true })
  marksheet12?: string | null;

  @Column({ name: "college_marksheet", type: "varchar", length: 255, nullable: true })
  collegeMarksheet?: string | null;

  @Column({ name: "aadhar_card", type: "varchar", length: 255, nullable: true })
  aadharCard?: string | null;

  @Column({ name: "pan_card", type: "varchar", length: 255, nullable: true })
  panCard?: string | null;

  @Column({ name: "bank_book", type: "varchar", length: 255, nullable: true })
  bankBook?: string | null;

  @Column({ name: "provisional_certificate", type: "varchar", length: 255, nullable: true })
  provisionalCertificate?: string | null;

  @Column({ name: "course_certificate", type: "varchar", length: 255, nullable: true })
  courseCertificate?: string | null;

  @Column({ name: "resume", type: "varchar", length: 255, nullable: true })
  resume?: string | null;

  @Column({ name: "passport_photo", type: "varchar", length: 255, nullable: true })
  passportPhoto?: string | null;

  @Column({ name: "is_active", type: "boolean", default: true })
  isActive!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}

export default EmployeesDetails;
