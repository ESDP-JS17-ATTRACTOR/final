import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { AddCategoryDto } from './dto/addCategory.dto';
import { TokenAuthGuard } from '../auth/token-auth.guard';
import { StaffGuard } from '../auth/staff.guard';
import { UpdateCategoryDto } from './dto/updateCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  @Post()
  @UseGuards(TokenAuthGuard, StaffGuard)
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
  @UseGuards(TokenAuthGuard, StaffGuard)
  async removeOneCategory(@Param('id') id: string) {
    const category = await this.categoryRepository.findOne({
      where: { id: parseInt(id) },
    });
    return this.categoryRepository.delete(category);
  }

  @Patch(':id')
  @UseGuards(TokenAuthGuard, StaffGuard)
  async updateCategory(
    @Param('id') id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const category = await this.categoryRepository.findOne({
      where: { id: id },
    });
    if (category) {
      category.title = updateCategoryDto.title;
      return this.categoryRepository.save(category);
    } else {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
  }

  @Get(':id')
  async getOneCategory(@Param('id') id: number) {
    return this.categoryRepository.findOne({
      where: { id: id },
      select: ['title'],
    });
  }
}
