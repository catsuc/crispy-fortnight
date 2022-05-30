import { RegisterMessageUseCase } from "./register-message-use-case";

const createMessageSpy = jest.fn();

const registerMessageUseCase = new RegisterMessageUseCase(
  { create: createMessageSpy },
);

describe("Register new message", () => {
  it("should to register new message", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        targetEmail: "email@example.com",
        targetDate: Date.now() + 100000,
      })
    ).resolves.not.toThrow();

    expect(createMessageSpy).toHaveBeenCalled();
  });

  it("should not register new message if targetData is past", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        targetEmail: "email@example.com",
        targetDate: Date.now() - 100000,
      })
    ).rejects.toThrow();
  });

  it("should not register new message if targetData is current time", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        targetEmail: "email@example.com",
        targetDate: Date.now(),
      })
    ).rejects.toThrow();
  });

  it("should not register new message if not have message", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "",
        targetEmail: "email@example.com",
        targetDate: Date.now() + 100000,
      })
    ).rejects.toThrow();
  });

  it("should not register new message if not have targetEmail", async () => {
    await expect(
      registerMessageUseCase.execute({
        message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
        targetEmail: "",
        targetDate: Date.now() + 100000,
      })
    ).rejects.toThrow();
  });
});
