export interface MessageCreateData {
  message: string;
  targetEmail: string;
  targetDate: Date;
}

export interface IMessageRepository {
  create(data: MessageCreateData): Promise<void>;
}
