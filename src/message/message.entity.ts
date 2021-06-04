import { BaseEntity, Column, Entity, ObjectIdColumn } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
  @ObjectIdColumn()
  _id?: string;

  @Column()
  sessionId?: string;

  @Column()
  userId?: string;

  @Column()
  messageContent?: string;

  @Column({ default: [] })
  seenBy?: string[];

  @Column({ default: false })
  isEdited?: boolean;

  @Column('date', { default: new Date() })
  createdAt?: Date;

  @Column('date', { default: new Date() })
  updatedAt?: Date;
}
