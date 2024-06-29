import { hash } from "bcrypt";
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "users" })
export default class UserEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "email" })
  email: string;

  @Column({ name: "username" })
  username: string;

  @Column({ name: "bio", default: "" })
  bio: string;

  @Column({ name: "image", default: "" })
  image: string

  @Column({ name: "password", select: false })
  password: string

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10)
  }
}