import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    app.listen(config.port, () => {
      console.log('server is running on 5000');
    });
  } catch (err) {
    console.log(err, 'error server');
  }
}
main();
