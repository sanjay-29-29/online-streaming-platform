import multer from 'multer';

const memory = multer.memoryStorage();

const disk = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  }
});

export const localStorage = multer({
  storage: disk
});

export const memoryStorage = multer({
  storage: memory
});
