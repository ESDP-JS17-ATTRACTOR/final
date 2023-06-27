import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NodemailerService {
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: configService.get('GOOGLE_MAIL'),
        pass: configService.get('GOOGLE_PASSWORD'),
      },
    });
  }

  async sendUpdatedPassword(email: string, content: string) {
    const htmlContent =
      '<td style="padding: 20px;">\n' +
      '  <p>Dear user,</p>\n' +
      '  <p>We have received a request to restore your password for the ONLINE-SCHOOL account.</p>\n <p>Your new password is:</p>' +
      '  <b>' +
      content +
      '</b>\n' +
      '  <p>Please login using the new password and consider changing it to a more secure one after logging in.</p>\n' +
      '  <p>If you did not request a password restoration, please contact our support team immediately.</p>\n' +
      '</td>\n';

    return await this.transporter.sendMail({
      from: '"ONLINE-SCHOOL" <esdp.group4@gmail.com>',
      to: email,
      subject: 'Hello',
      text: content,
      html: htmlContent,
    });
  }

  async sendAccountsInfo(email: string, content: string) {
    const htmlContent =
      '<td style="padding: 20px;">\n' +
      '  <p>Dear user,</p>\n' +
      '  <p>Congratulations on creating your new account in our application!</p>\n' +
      '  <p>Your account details are:</p>\n' +
      '  <ul>\n' +
      '    <li><strong>Email:</strong> ' +
      email +
      '</li>\n' +
      '    <li><strong>Password:</strong> ' +
      content +
      '</li>\n' +
      '  </ul>\n' +
      '  <p>Please use these credentials to log in to the application.</p>\n' +
      '  <p>We recommend changing your password after logging in to ensure account security.</p>\n' +
      '  <p>If you did not create this account, please contact our support team immediately.</p>\n' +
      '</td>\n';

    return await this.transporter.sendMail({
      from: '"ONLINE-SCHOOL" <esdp.group4@gmail.com>',
      to: email,
      subject: 'Hello',
      text: content,
      html: htmlContent,
    });
  }

  async sendFormData(userData: { name: string; email: string; message: string }) {
    const { name, email, message } = userData;

    const htmlContent = `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Message: ${message}</p>
    `;

    return await this.transporter.sendMail({
      from: '"ONLINE-SCHOOL" <esdp.group4@gmail.com>',
      to: 'cholponakhm@gmail.com',
      subject: 'New Form Submission',
      html: htmlContent,
    });
  }
}
