import "../tests/utils/prisma-mock";
import { CreateMessageService } from "./create-message-service";
import { prisma } from "../libs/prisma";
import { afterEach, describe, expect, it, jest } from "@jest/globals";

describe("CreateMessageService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    const service = new CreateMessageService();

    expect(service).toBeDefined();
    expect(service).toBeInstanceOf(CreateMessageService);
  });

  it("should be have execute method", () => {
    const service = new CreateMessageService();

    expect(service.execute).toBeDefined();
    expect(service.execute).toBeInstanceOf(Function);
  });

  it("should create a new message on database", async () => {
    const service = new CreateMessageService();

    const input = {
      message: "Hello",
      targetDate: new Date("2022-9-12"),
      targetEmail: "mail@example.com",
    };

    await service.execute(input);

    expect(prisma.message.create).toBeCalledTimes(1);
    expect(prisma.message.create).toBeCalledWith({
      data: {
        ...input,
        targetDate: new Date(input.targetDate),
      },
    });
  });
});
