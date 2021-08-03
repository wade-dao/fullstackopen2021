import express from 'express';
import { calculateBmi } from './calculateBmi';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const bmi = calculateBmi({
    w: Number(req.query.weight),
    h: Number(req.query.height)
  });

  if (bmi === 'malformatted parameters') {
    res.status(400).json({ error: bmi }).end();
  }

  res.send({
    weight: Number(req.query.weight),
    height: Number(req.query.height),
    bmi: bmi
  });
});

app.post('/exercises', ({ body: { daily_exercises, target }}, res) => {
  const exercises = calculateExercises(daily_exercises, target);

  if (exercises.ratingDescription === 'malformatted parameters' || exercises.ratingDescription === 'parameters missing') {
    res.status(400).send({ error: exercises.ratingDescription }).end();
  }
  else {
    res.send(exercises);
  }
});

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});