import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Enrollment } from "../../enrollment/models/enrollement.entity";
import { Rating } from "../../rating/models/rating.entity";

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

  @OneToMany(() => Rating, (rating) => rating.course, { onDelete: 'CASCADE'})
  ratings: Rating[]

  @OneToMany(() => Enrollment, (enrollment) => enrollment.course, { onDelete: 'CASCADE'})
  enrollments: Enrollment

}