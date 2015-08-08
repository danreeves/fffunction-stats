import express from 'express';

const app = express();

app.get('/', (req, res) => res.json());

app.listen(80);
