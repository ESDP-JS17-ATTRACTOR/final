import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../../entities/category.entity';
import { Repository } from 'typeorm';
import { AddCategoryDto } from './dto/addCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { Course } from '../../entities/course.entity';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async addCategory(categoryData: AddCategoryDto): Promise<Category> {
    await this.checkForCategoryNotExists(categoryData.title);

    const category = await this.categoryRepository.create({
      title: categoryData.title,
    });

    return await this.categoryRepository.save(category);
  }

  async updateCategory(id: number, categoryData: UpdateCategoryDto): Promise<Category> {
    const category = await this.checkForCategoryExists(id);
    await this.checkForCategoryNotExists(categoryData.title);
    category.title = categoryData.title;
    return await this.categoryRepository.save(category);
  }

  async removeOneCategory(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    } else {
      const defaultCategory = await this.categoryRepository.findOne({ where: { isDefault: true } });
      const coursesToMove = await this.courseRepository.find({ where: { category: category } });
      for (const course of coursesToMove) {
        course.category = defaultCategory;
        await this.courseRepository.save(course);
      }
      return this.categoryRepository.delete(category);
    }
  }

  async getOneCategory(id: number): Promise<Category> {
    const oneCategory = await this.categoryRepository.findOne({
      where: { id },
      select: ['title'],
    });
    if (!oneCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return oneCategory;
  }

  private async checkForCategoryNotExists(title: string): Promise<void> {
    const existCategory = await this.categoryRepository.findOne({
      where: { title },
    });
    if (existCategory) {
      throw new BadRequestException('Category with this title already exists');
    }
  }

  private async checkForCategoryExists(id: number): Promise<Category> {
    const existCategory = await this.categoryRepository.findOne({
      where: { id },
    });
    if (!existCategory) {
      throw new NotFoundException(`Category with id ${id} not found`);
    } else {
      return existCategory;
    }
  }
}
