import UserEntity from "src/user/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "messages" })
export default class MessageEntity {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "text" })
  text: string;

  @ManyToOne(() => UserEntity, (user) => user.sentMessages)
  from: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.receivedMessages)
  to: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}