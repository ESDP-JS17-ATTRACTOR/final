import {
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketServer,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentsService } from '../routers/comments/comments.service';
import { CurrentUser } from '../auth/currentUser.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../routers/comments/dto/createComment.dto';
import { Param } from '@nestjs/common';

@WebSocketGateway({ cors: true })
export class MyWebSocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;

  constructor(
    private readonly commentsService: CommentsService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async handleConnection(@Param('id') lessonId: number, client: Socket) {
    // const messages = await this.commentsService.getAll(lessonId);
    // client.emit('allMessages', messages);
    console.log('Server on');
  }

  handleDisconnect(client: Socket) {
    // Обработка отключения
  }

  @SubscribeMessage('message')
  async handleMessage(@CurrentUser() user: User, @MessageBody() message: CreateCommentDto): Promise<void> {
    const newMessage = await this.commentsService.createComment(user.id, message);
    this.server.emit('message', newMessage as any);
  }
}
