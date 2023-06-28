import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import * as crypto from 'crypto';

export const multerVideoStorage = diskStorage({
  destination: (req, file, cb) => {
    const dir = './public/uploads/course/lessons/video';
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const id = crypto.randomUUID();
    const extension = file.originalname.split('.').pop();
    cb(null, `${id}.${extension}`);
  },
});
