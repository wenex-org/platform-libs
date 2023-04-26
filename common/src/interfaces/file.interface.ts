import type { Schema } from '../schemas';

export interface File extends Express.Multer.File, Schema<File> {}
