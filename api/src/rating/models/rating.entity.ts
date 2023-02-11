import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "../../user/models/user.entity";
import { Course } from "../../course/models/course.entity";

@Entity()
export class Rating {

  @PrimaryColumn()
  courseId: number;

  @PrimaryColumn()
  userId: number;
  
  @Column({nullable: false})
  rating: number

  @ManyToOne(() => User, (user) => user.ratings, {onDelete: 'CASCADE'})
  @JoinColumn({ name: "userId" })
  user: User

  @ManyToOne(() => Course, (course) => course.ratings, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "courseId" })
  course: Course;

}