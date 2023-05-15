import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Lesson } from '../entities/lesson.entity';
import { Comment } from '../entities/comment.entity';
import { CreateCommentDto } from './dto/createComment.dto';

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

  async getAll(lessonId: number) {
    let query = this.commentsRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.author', 'userId')
      .leftJoinAndSelect('comment.lesson', 'lessonId')
      .select([
        'comment',
        'userId.id',
        'userId.firstName',
        'userId.lastName',
        'lessonId.id',
      ]);

    if (lessonId) {
      query = query.where('lessonId.id = :lessonId', { lessonId });
    }

    const lessonsComments = await query.getMany();

    if (!lessonsComments.length) {
      throw new NotFoundException('This lesson has no comments!');
    }
    return lessonsComments;
  }

  async createComment(userId: number, body: CreateCommentDto) {
    const comment = await this.commentsRepository.findOne({
      where: { text: body.text },
    });

    if (comment) {
      throw new BadRequestException(
        'Comment with the same text already exists!',
      );
    }

    const user = await this.usersRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User is not found!');
    }

    const lesson = await this.lessonsRepository.findOne({
      where: { id: body.lessonId },
    });

    if (!lesson) {
      throw new NotFoundException('Lesson is not found!');
    }

    const newComment = await this.commentsRepository.create({
      author: user,
      lesson: lesson,
      text: body.text,
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
