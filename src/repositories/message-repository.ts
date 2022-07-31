import { MessageEntity } from '../entities/message-entity';

export interface MessageCreateData {
  message: string;
  targetEmail: string;
  targetDate: Date;
}

export interface MessageFindWhere {
  targetDate: Date;
}

export interface MessageUpdateData {
  id: string;
  sentAt: Date;
}
export interface MessageRepository {
  create(data: MessageCreateData): Promise<void>;

  findMany(where: MessageFindWhere): Promise<MessageEntity[]>;

  update(data: MessageUpdateData): Promise<void>;
}
