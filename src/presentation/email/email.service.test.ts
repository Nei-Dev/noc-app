import { EmailService, SendEmailOptions } from './email.service';
import nodemailer from 'nodemailer';

describe('Email Service', () => {

  const mockSendMail = jest.fn();
  nodemailer.createTransport = jest.fn().mockReturnValue({
    sendMail: mockSendMail
  });

  const toEmail = 'galvideveloper@gmail.com';
  const fromEmail = 'neibusdev@fakemail.com';
  const emailService = new EmailService();
  const options: SendEmailOptions = {
    to: toEmail,
    subject: 'Test email',
    htmlBody: '<h1>CACHONNNN!</h1>',
  }

  test('Should send an email', async () => {

    const emailSent = await emailService.sendEmail(options);
    expect(emailSent).toBe(true);
    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: expect.any(Array),
      // from: fromEmail,
      html: '<h1>CACHONNNN!</h1>',
      subject: 'Test email',
      to: toEmail,
    })
  });

  test('Should send an email with attachments', async () => {
    await emailService.sendEmailWithFileSystemLogs(toEmail);

    expect(mockSendMail).toHaveBeenCalledWith({
      attachments: [
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' },
        { filename: 'logs-low.log', path: './logs/logs-low.log' },
      ],
      // from: fromEmail,
      html: expect.any(String),
      subject: expect.any(String),
      to: toEmail,
    });
      
  });
});