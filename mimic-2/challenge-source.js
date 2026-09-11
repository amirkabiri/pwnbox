const express = require('express');
const multer = require('multer');
const { randomUUID } = require('crypto');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const upload = multer();
const s3 = new S3Client({ region: process.env.AWS_REGION });
const BUCKET = process.env.S3_BUCKET;

app.get('/', (_, res) => res.send(
  '<form action="/upload" method="post" enctype="multipart/form-data"><input type="file" name="file" accept="image/png"><button>Upload</button></form>'
));

app.post('/upload', upload.single('file'), async (req, res) => {
  const key = `${randomUUID()}.png`;
  await s3.send(new PutObjectCommand({
    Bucket: BUCKET,
    Key: key,
    Body: req.file.buffer,
    ContentType: 'image/png',
    ACL: 'public-read',
  }));
  res.json({ key, url: `/file/${key}` });
});

app.use('/file', createProxyMiddleware({
  target: `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com`,
  changeOrigin: true,
  pathRewrite: { '^/file': '' },
}));

app.listen(3000, () => console.log('up on 3000'));
