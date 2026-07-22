import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { SubCategory } from "./subCategory";
import { Leads } from "./Leads";

@Entity("categories")
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column({ default: true })
  status!: boolean;

  @OneToMany(() => SubCategory, (sub) => sub.category)
  subCategories!: SubCategory[];

  @OneToMany(() => Leads, (lead) => lead.category)
  leads!: Leads[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}