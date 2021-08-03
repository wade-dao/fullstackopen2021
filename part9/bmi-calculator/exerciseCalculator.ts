interface ExerciseOverview {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

// interface ExerciseData {
//   target: number,
//   exerciseData: Array<number>
// }

// const parseArgumentsEx = (args: Array<any>): ExerciseData => {
//   if (args.length < 4) throw new Error('Not enough arguments');

//   if (args.filter(a => isNaN(Number(a))).length > 2) throw new Error('Provided values were not numbers!');

//   if (Number(args[2]) === 0) throw new Error('Target value could not be 0!');

//   const data = args.filter(a => !isNaN(Number(a)));
//   data.splice(0, 1);
//   const numberData = data.map(a => Number(a));
//   return {
//     target: Number(args[2]),
//     exerciseData: numberData
//   };
// };

const inputValidation = (exerciseData: Array<number>, targetAmount: number): string => {
  if (!Array.isArray(exerciseData) || isNaN(Number(targetAmount)))
    return 'malformatted parameters';

  if (exerciseData.filter(a => isNaN(Number(a))).length > 0)
    return 'malformatted parameters';

  if (exerciseData.length === 0 || typeof(targetAmount) === 'undefined' || typeof(exerciseData) === 'undefined')
    return 'parameters missing';

  return 'OK';
};

export const calculateExercises = (exerciseData: Array<number>, targetAmount: number): ExerciseOverview => {
  console.log(exerciseData, targetAmount);
  const err = inputValidation(exerciseData, targetAmount);

  if (err === 'OK') {
    const trainingDays = exerciseData.filter(x => x > 0).length;
    const average = exerciseData.reduce((e, s) => s = s + e) / exerciseData.length;
    const success = average > targetAmount ? true : false;

    let rating = 1;
    let ratingDescription = 'desc';
    switch (true) {
      case (average < targetAmount * 0.85):
        rating = 1;
        ratingDescription = 'need to put a lot of effort into this';
        break;
      case (average < targetAmount):
        rating = 2;
        ratingDescription = 'not too bad but could be better';
        break;
      case (average <= targetAmount * 1.2):
        rating = 2;
        ratingDescription = 'pretty good, the target could be higher next time';
        break;
      default:
        rating = 3;
        ratingDescription = 'the result is great! aim higher!';
    }

    return {
      periodLength: exerciseData.length,
      trainingDays: trainingDays,
      target: targetAmount,
      average: average,
      success: success,
      rating: rating,
      ratingDescription: ratingDescription
    };
  } else {
    return {
      periodLength: 0,
      trainingDays: 0,
      target: 0,
      average: 0,
      success: false,
      rating: 0,
      ratingDescription: err
    };
  }
};

// const { exerciseData, target } = parseArgumentsEx(process.argv)
// console.log(calculateExercises(exerciseData, target))