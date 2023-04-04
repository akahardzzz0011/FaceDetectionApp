import express from 'express';
import cors from 'cors';
const app = express();
import upload from 'express-fileupload';
const port = 3003
import uploadRouter from './router/uploadImageRouter.js';

app.use(cors());
app.use('/static', express.static('uploads'));
app.use(upload());
app.use('/faceDetection', uploadRouter);

app.get('/', (req, res) => {
  res.send("Home of the DNN!")
});

app.listen(port || 3001, () => {
  console.log(`Listening on port ${port}`);
});