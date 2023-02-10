import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "../../user/models/user.entity";
import { Course } from "../../course/models/course.entity";

@Entity()
export class Enrollment {

  @PrimaryColumn()
  courseId: number;

  @PrimaryColumn()
  userId: number;
  
  @Column({
    type: 'datetime'    
  })
  deadline: Date

  @ManyToOne(() => User, (user) => user.enrollments, {onDelete: 'CASCADE'})
  @JoinColumn({ name: "userId" })
  user: User 

  @ManyToOne(() => Course, (course) => course.enrollments, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "courseId" })
  course: Course
  
}