import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { CurrentUser } from '../../auth/currentUser.decorator';
import { User } from '../../entities/user.entity';
import { TokenAuthGuard } from '../../auth/token-auth.guard';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Get() // Guard ???
  async getAll(@Query('userId') userId: number) {
    return this.purchasesService.getAll(userId);
  }

  @Get('/my-courses')
  @UseGuards(TokenAuthGuard)
  async getCoursesWithModules(@CurrentUser() user: User) {
    return this.purchasesService.getCoursesWithModules(user.id);
  }

  @Post() // Guard ???
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(TokenAuthGuard)
  async createPurchase(@CurrentUser() user: User, @Body() body: { id: number }) {
    return this.purchasesService.createPurchase(user, body.id);
  }

  @Delete(':id') // Guard ???
  async removePurchase(@Param('id') id: number) {
    return this.purchasesService.removePurchase(id);
  }
}
