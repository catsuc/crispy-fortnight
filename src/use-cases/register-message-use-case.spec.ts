import { MessageRepository } from "../repositories/message-repository";
import { RegisterMessageUseCase } from "./register-message-use-case";

const createMessageSpy = jest.fn();

const registerMessageUseCase = new RegisterMessageUseCase(
  { create: createMessageSpy } as any as MessageRepository,
);

describe("Register new message", () => {
  beforeEach(() => {
    jest
    .useFakeTimers()
    .setSystemTime(new Date('2022-07-22'));
  })

  afterEach(() => {
    jest
    .useRealTimers()
  })
  it("should to register new message", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        targetEmail: "email@example.com",
        targetDate: new Date(Date.now() + 1),
      })
    ).resolves.not.toThrow();

    expect(createMessageSpy).toHaveBeenCalled();
  });

  it("should not register new message if targetData is past", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        targetEmail: "email@example.com",
        targetDate: new Date(Date.now() - 1),
      })
    ).rejects.toThrow();
  });

  it("should not register new message if targetData is current time", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        targetEmail: "email@example.com",
        targetDate: new Date(),
      })
    ).rejects.toThrow();
  });

  it("should not register new message if not have message", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "",
        targetEmail: "email@example.com",
        targetDate: new Date(Date.now() + 1)
      })
    ).rejects.toThrow();
  });

  it("should not register new message if not have targetEmail", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        targetEmail: "",
        targetDate: new Date(Date.now() + 1)
      })
    ).rejects.toThrow();
  });
});
