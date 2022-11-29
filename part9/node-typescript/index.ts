import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: 'malformatted parameters' });
  }
  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (!target || !daily_exercises) {
    return res.status(400).send({ error: 'paramateres missing' });
  }

  if (isNaN(Number(target)) || !Array.isArray(daily_exercises)) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }

  const malformattedExercises: string[] = [];

  daily_exercises.forEach((e) => {
    if (isNaN(Number(e))) malformattedExercises.push(String(e));
  });

  if (malformattedExercises.length > 0) {
    return res.status(400).send({
      error: `Field daily_exercises contains non numeric values: ${malformattedExercises.join(
        ', '
      )}!`,
    });
  }

  const exercises: number[] = daily_exercises.map((e) => Number(e));

  const result = calculateExercises(exercises, Number(target));
  return res.json(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
