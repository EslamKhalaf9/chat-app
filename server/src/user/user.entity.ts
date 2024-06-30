import { hash } from "bcrypt";
import MessageEntity from "src/message/message.entity";
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

  @OneToMany(() => MessageEntity, (message) => message.from)
  sentMessages: MessageEntity[]

  @OneToMany(() => MessageEntity, (message) => message.to)
  receivedMessages: MessageEntity[]

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10)
  }
}