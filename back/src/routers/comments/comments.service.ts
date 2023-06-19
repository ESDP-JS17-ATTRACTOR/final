import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { Lesson } from '../../entities/lesson.entity';
import { Comment } from '../../entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Lesson)
    private readonly lessonsRepository: Repository<Lesson>,
    @InjectRepository(Comment)
    private readonly commentsRepository: Repository<Comment>,
  ) {}

  async getAll(id: number) {
    const comments = await this.commentsRepository.find({
      relations: ['author', 'lesson'],
      where: { lesson: { id } },
    });

    return comments.map((comment) => {
      return {
        id: comment.id,
        author: `${comment.author.firstName} ${comment.author.lastName}`,
        lesson: comment.lesson.id,
        message: comment.message,
      };
    });
  }

  async createComment(userId: number, lessonId: number, message: string) {
    // const comment = await this.commentsRepository.findOne({
    //   where: { message },
    // });
    //
    // if (comment) {
    //   throw new BadRequestException('Comment with the same text already exists!');
    // }

    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User is not found!');
    }

    const lesson = await this.lessonsRepository.findOne({
      where: { id: lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson is not found!');
    }

    const newComment = this.commentsRepository.create({
      author: user,
      lesson: lesson,
      message: message,
    });

    return this.commentsRepository.save(newComment);
  }

  async removeComment(commentId: number) {
    const comment = await this.commentsRepository.findOne({
      where: { id: commentId },
    });

    if (!comment) {
      throw new NotFoundException('Comment is not found!');
    }

    await this.commentsRepository.delete(commentId);
    return { message: 'Comment deleted' };
  }
}
