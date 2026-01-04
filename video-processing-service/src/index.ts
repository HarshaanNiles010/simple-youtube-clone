const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req:any, res:any) => {
    res.send('Video Processing Service is running');
});

app.listen(PORT, () => {
    console.log(`Video Processing Service is listening on port ${PORT}`);
});