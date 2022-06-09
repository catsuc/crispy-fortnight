export interface MessageCreateData {
  message: string;
  targetEmail: string;
  targetDate: Date;
}

export interface MessageRepository {
  create(data: MessageCreateData): Promise<void>;
}
