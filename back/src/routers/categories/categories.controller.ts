import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { AddCategoryDto } from './dto/addCategory.dto';
import { TokenAuthGuard } from '../../auth/token-auth.guard';
import { StaffGuard } from '../../auth/staff.guard';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { CategoriesService } from './categories.service';

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly categoryService: CategoriesService,
  ) {}

  @Post()
  @UseGuards(TokenAuthGuard, StaffGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async addCourse(@Body() body: AddCategoryDto) {
    return this.categoryService.addCategory(body);
  }

  @Get()
  async getAll() {
    return this.categoryRepository.find({ where: { isDefault: false } });
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async updateCategory(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.updateCategory(id, updateCategoryDto);
  }

  @Delete(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async removeOneCategory(@Param('id') id: number) {
    return this.categoryService.removeOneCategory(id);
  }

  @Get(':id')
  async getOneCategory(@Param('id') id: number) {
    return this.categoryService.getOneCategory(id);
  }
}
