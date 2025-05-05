import 'reflect-metadata';
import app from './app';
import dotenv from 'dotenv';
import connectToDataBase from './config/mongoose.config';

const result = dotenv.config();

setTimeout(() => {
  if (result.error) {
    console.log(result.error);
    throw result.error;
  }
  console.log('Environment Varaible are successfully loaded');
}, 1000);

connectToDataBase();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
