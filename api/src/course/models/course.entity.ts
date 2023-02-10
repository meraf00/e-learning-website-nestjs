import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Enrollment } from "../../enrollment/models/enrollement.entity";

@Entity()
export class Course {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  difficulty: string;

  @Column()
  description: string;

  @Column()
  img_url: string;

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course, { onDelete: 'CASCADE'})
  enrollments: Enrollment

}