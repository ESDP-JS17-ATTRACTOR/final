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
}
