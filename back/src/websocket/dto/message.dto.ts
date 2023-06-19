import { Entity } from 'typeorm';

@Entity()
export class MessageDto {
  author: number;
  lesson: number;
  message: string;
}

// export class MessageDto {
//   data: {
//     author: number;
//     lesson: number;
//     message: string;
//   };
// }
