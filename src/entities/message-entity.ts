export interface MessageEntity {
  id: string;
  message: string;
  targetEmail: string;
  targetDate: Date;
  sentAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
