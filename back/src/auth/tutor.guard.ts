import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { User } from '../entities/user.entity';

@Injectable()
export class TutorGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest() as Request;
    const user = request.user as User | undefined;
    if (!user) {
      throw new Error('This Guard works only after TokenAuthGuard');
    }
    return user.role === 'tutor';
  }
}
