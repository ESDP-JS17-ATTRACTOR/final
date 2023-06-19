import { WebSocketGateway, SubscribeMessage, WebSocketServer, OnGatewayConnection } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { CommentsService } from '../routers/comments/comments.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { MessageDto } from './dto/message.dto';

@WebSocketGateway({ cors: true })
export class MyWebSocketGateway implements OnGatewayConnection {
  constructor(
    private readonly commentsService: CommentsService,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  @WebSocketServer()
  private server: Server;

  async handleConnection(client: Socket): Promise<void> {
    console.log(`Client connected: ${client.id}`);
  }

  @SubscribeMessage('start')
  async handleStart(client: Socket, lessonId: number): Promise<void> {
    const comments = await this.commentsService.getAll(lessonId);
    client.emit('comments', comments);
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: MessageDto): Promise<void> {
    const { author, lesson, message } = data;
    const newMessage = this.commentsService.createComment(author, lesson, message);
    this.server.emit('message', newMessage);
  }

  // @SubscribeMessage('start')
  // async handleStart(@MessageBody() message: string, @ConnectedSocket() client: Socket): Promise<void> {
  //   const id = parseInt(message);
  //   if (!isNaN(id)) {
  //     const allMessages = await this.commentsService.getAll(id);
  //     client.emit('start', allMessages);
  //   }
  // }

  // @SubscribeMessage('message')
  // handleMessage(@MessageBody() message: MessageDto): void {
  //   const newMessage = this.commentsService.createComment(
  //     message.data.author,
  //     message.data.lesson,
  //     message.data.message,
  //   );
  //   this.server.emit('message', newMessage);
  // }
}
