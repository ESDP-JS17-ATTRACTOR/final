import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { AddCategoryDto } from './dto/addCategoryDto';

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  @Post('add')
  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(ValidationPipe)
  async addCourse(@Body() body: AddCategoryDto) {
    const existCategory = await this.categoryRepository.findOne({
      where: { title: body.title },
    });
    if (existCategory) {
      throw new BadRequestException('Category with this title already exists');
    }

    const category = this.categoryRepository.create(body);
    return this.categoryRepository.save(category);
  }

  @Get()
  async getAll() {
    return this.categoryRepository.find();
  }

  @Delete(':id')
  async removeOneCategory(@Param('id') id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: parseInt(id) },
    });
    return this.categoryRepository.delete(category);
  }
}
