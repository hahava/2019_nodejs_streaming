import cookieParser from 'cookie-parser';
import 'core-js/stable/index.js';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import 'regenerator-runtime/runtime.js';
import * as dotEnv from 'dotenv';
import mongoose from 'mongoose';
import http from 'http';
import ejs from 'ejs';
import morgan from 'morgan';
import authRouter from './api/auth/route/authRoute.js';
import videoRouter from './api/video/router/videoRouter.js';
import jwtMiddleware from './common/middleware/jwtMiddleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const FRONT_DIR = path.join(__dirname, 'front');
const ENV_PATH = path.join(__dirname, '.env');
const MONGO_CONNECT_OPTIONS = {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
};

dotEnv.config({ path: ENV_PATH });
const PORT = Number.parseInt(process.env.PORT, 10) || 5696;
const LOG_FORMAT = process.env.LOG_LEVEL || 'dev';

const app = express();
let server = null;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(FRONT_DIR));
app.set('views', FRONT_DIR);
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile);

app.use(morgan(LOG_FORMAT));
app.use(jwtMiddleware);
app.use('/api/auth', authRouter);
app.use('/api/video', videoRouter);

app.get('*', (req, res) => {
  res.render('index.html');
});

app.set('port', PORT);

const closeServer = () => new Promise((resolve) => {
  if (!server) {
    resolve();
    return;
  }

  server.close(() => {
    resolve();
  });
});

const shutdown = async (signal) => {
  console.log(`${signal} received. Shutting down server...`);
  await closeServer();
  await mongoose.connection.close();
  process.exit(0);
};

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, MONGO_CONNECT_OPTIONS);
    console.log('MongoDB is connected');

    server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

    server.on('error', (error) => {
      console.error('HTTP server error', error);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  shutdown('SIGINT')
    .catch((error) => {
      console.error('Shutdown failed', error);
      process.exit(1);
    });
});

process.on('SIGTERM', () => {
  shutdown('SIGTERM')
    .catch((error) => {
      console.error('Shutdown failed', error);
      process.exit(1);
    });
});

startServer();

export default app;
