import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CourseModule } from '../entities/courseModule.entity';
import { Repository } from 'typeorm';
import { CourseModulesService } from './courseModules.service';
import { CreateCourseModuleDto } from './dto/createCourseModule.dto';

@Controller('course-modules')
export class CourseModulesController {
  constructor(
    @InjectRepository(CourseModule)
    private readonly courseModulesRepository: Repository<CourseModule>,
    private readonly courseModulesService: CourseModulesService,
  ) {}

  @Get()
  async getAll(@Query('courseId') courseId: number) {
    return this.courseModulesService.getAll(courseId);
  }

  @Post()
  async createCourseModule(@Body() body: CreateCourseModuleDto) {
    return this.courseModulesService.createCourseModule(body);
  }

  @Patch(':id')
  async updateCourseModule(@Param('id') id: number, @Body() body: CreateCourseModuleDto) {
    return this.courseModulesService.updateCourseModule(id, body);
  }

  @Delete(':id')
  async removeCourseModule(@Param('id') id: number) {
    return this.courseModulesService.removeCourseModule(id);
  }
}
