import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
  ManyToOne,
  JoinColumn
} from "typeorm";
import { Category } from "./categories";
import { SubCategory } from "./subCategory";

@Entity({ name: "Leads" })
export class Leads {
  @PrimaryGeneratedColumn("uuid")
  id!: String;

  @Column({ name: "first_name", type: "varchar", length: 100 })
  firstName!: string;

  @Column({ name: "last_name", type: "varchar", length: 100 })
  lastName!: string;

  @Index({ unique: true })
  @Column({ type: "varchar", length: 150, unique: true })
  email!: string;

  @Column({ name: "country_code", type: "varchar", length: 5, default: "+91" })
  countryCode!: string;

  @Column({ name: "phone_number", type: "varchar", length: 15 })
  phoneNumber!: string;

  @Column({ type: "varchar", length: 150 })
  project!: string;

  @Column({ type: "varchar", length: 150 })
  location!: string;

  @Column({ name: "budget_range", type: "varchar", length: 100 })
  budgetRange!: string;

  @Column({ name: "configuration_type", type: "varchar", length: 100 })
  configurationType!: string;

  @Column({ name: "property_type", type: "varchar", length: 100 })
  propertyType!: string;

   @ManyToOne(() => Category, (category) => category.leads)
   @JoinColumn({ name: "category_id" })
   category!: Category;

   @ManyToOne(() => SubCategory)
   @JoinColumn({ name: "subcategory_id" })
   subCategory!: SubCategory;

  // ---------- Document Paths ----------

  @Column({
    name: "pan_card",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  panCard?: string | null;

  @Column({
    name: "aadhar_card",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  aadharCard?: string | null;

  @Column({
    name: "passport",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  passport?: string | null;

  @Column({
    name: "driving_license",
    type: "varchar",
    length: 255,
    nullable: true,
  })
  drivingLicense?: string | null;

  @Column({
    name: "is_active",
    type: "boolean",
    default: true,
  })
  isActive!: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}

export default Leads;