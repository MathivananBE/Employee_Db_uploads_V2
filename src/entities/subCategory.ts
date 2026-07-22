import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from "typeorm";
import { Category } from "./categories";
import { Leads } from "./Leads";

@Entity("sub_categories")
export class SubCategory {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ name: "category_id", type: "uuid" })
  categoryId!: string;

  @ManyToOne(() => Category, (category) => category.subCategories, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "category_id" })
  category!: Category;

  @Column()
  name!: string;

  @Column({ default: true })
  status!: boolean;

  @OneToMany(() => Leads, (lead) => lead.subCategory)
  leads!: Leads[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}