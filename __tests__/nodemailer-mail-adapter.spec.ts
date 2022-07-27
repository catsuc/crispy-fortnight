import { NodemailerMailAdapter } from "../src/adapters/nodemailer/nodemailer-mail-adapter";

interface TransporterMock {
  sendMail: typeof jest.fn;
}

describe("Mail adapter", () => {
  let nodemailerMailAdapter: NodemailerMailAdapter;
  let transporterMock: TransporterMock;

  beforeEach(() => {
    nodemailerMailAdapter = new NodemailerMailAdapter();

    transporterMock = {
      sendMail: jest.fn(),
    };

    (nodemailerMailAdapter as any).mailTransport = transporterMock;
  });

  it("should have a sendMail method", () => {
    expect(nodemailerMailAdapter.sendMail).toBeInstanceOf(Function);
  });

  it("should call transport sendMail method", async () => {
    const input = {
      body: "any",
      subject: "Test",
      to: "me",
    };

    await nodemailerMailAdapter.sendMail(input);

    expect(transporterMock.sendMail).toBeCalledTimes(1);
    expect(transporterMock.sendMail).toBeCalledWith({
      subject: input.subject,
      text: input.body,
      to: input.to,
    });
  });
});
