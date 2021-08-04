import express from 'express';
import cors from 'cors';

import diagnosisRouter from './src/routes/diagnoses';
import patientRouter from './src/routes/patients';

const app = express();
app.use(express.json());
app.use(cors());  

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientRouter);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});