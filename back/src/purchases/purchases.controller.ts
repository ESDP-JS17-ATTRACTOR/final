import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from '../entities/purchase.entity';
import { Repository } from 'typeorm';
import { CurrentUser } from '../auth/currentUser.decorator';
import { User } from '../entities/user.entity';
import { Course } from '../entities/course.entity';
import { TokenAuthGuard } from '../auth/token-auth.guard';

@Controller('purchases')
export class PurchasesController {
  constructor(
    @InjectRepository(Purchase)
    private readonly purchasesRepository: Repository<Purchase>,
    private readonly purchasesService: PurchasesService,
  ) {}

  @Get() // Guard ???
  async getAll(@Query('userId') userId: number) {
    return this.purchasesService.getAll(userId);
  }

  @Post() // Guard ???
  @UseGuards(TokenAuthGuard)
  async createPurchase(@CurrentUser() user: User, course: Course) {
    return this.purchasesService.createPurchase(user, course);
  }

  @Delete(':id') // Guard ???
  async removePurchase(@Param('id') id: number) {
    return this.purchasesService.removePurchase(id);
  }
}
