const express = require('express');
const AWS = require('aws-sdk');
const multer = require('multer');
const File = require('../models/File');
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_SECRET
});

router.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  const { email } = req.body;
  const filename = `${Date.now()}-${file.originalname}`;

  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: filename,
    Body: file.buffer,
  };

  try {
    const s3Result = await s3.upload(params).promise();
    const newFile = new File({ filename, email, url: s3Result.Location });
    await newFile.save();
    res.json(newFile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:email', async (req, res) => {
  const files = await File.find({ email: req.params.email });
  res.json(files);
});

module.exports = router;
