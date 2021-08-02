import express from 'express';
import { calculateBmi } from './calculateBmi';

const app = express();

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const bmi = calculateBmi({
    w: Number(req.query.weight),
    h: Number(req.query.height)
  });

  if (bmi === 'malformatted parameters') {
    res.json({ error: bmi }).status(400).end();
  }

  res.send({
    weight: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: bmi
  });
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});