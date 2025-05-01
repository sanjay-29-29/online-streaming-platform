import multer from 'multer';

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage
});

export type MulterFiles = Record<string, Express.Multer.File[]>;

export interface MulterRequest extends Request {
  files: MulterFiles;
}

export default upload;
