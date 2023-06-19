import { Module } from '@nestjs/common';
import { NodemailerService } from './nodemailer.service';
import { ConfigService } from '@nestjs/config';

@Module({
  providers: [NodemailerService, ConfigService],
  exports: [NodemailerService],
})
export class NodemailerModule {}
