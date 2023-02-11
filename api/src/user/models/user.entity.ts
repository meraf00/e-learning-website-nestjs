import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Enrollment } from "../../enrollment/models/enrollement.entity";
import { Rating } from '../../rating/models/rating.entity';

@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @BeforeInsert()
  @BeforeUpdate()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  @OneToMany(() => Rating, (rating) => rating.user)
  ratings: Rating[]

  @OneToMany(() => Enrollment, (enrollment) => enrollment.user)
  enrollments: Enrollment[]
}