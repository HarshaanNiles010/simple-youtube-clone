const express = require('express');
const ffmpeg = require('fluent-ffmpeg');

const app = express();
app.use(express.json());

app.post('/process-video', (req:any, res:any) => {
    const inputFilePath = req.body.inputFilePath;
    const outputFilePath = req.body.outputFilePath;
    if (!inputFilePath || !outputFilePath) {
        return res.status(400).send('Input and output file paths are required.');
    }

    // Create the ffmpeg command to process the video
    ffmpeg(inputFilePath)
        .outputOptions('-vf', 'scale= -1:360')
        .on('end', function() {
            console.log('Video processing finished successfully');
            res.status(200).send('Video processed successfully.');
        })
        .on('error', function(err: any) {
            console.log('An error occurred: ' + err.message);
            res.status(500).send('An error occurred: ' + err.message);
        })
        .save(outputFilePath);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Video Processing Service is listening on port ${PORT}`);
});