import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { EmployeesDetails } from "./Employee";

@Entity("departments")
export class Department {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  name!: string;

  @Column({ default: true })
  status!: boolean;

  @OneToMany(() => EmployeesDetails, (employee) => employee.department)
  employees!: EmployeesDetails[];

  @CreateDateColumn({ name: "created_at" })
  createdAt!: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt!: Date;
}