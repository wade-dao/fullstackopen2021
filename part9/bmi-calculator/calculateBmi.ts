interface BMIData {
  h: number;
  w: number;
}

const parseArgumentsBmi = (args: Array<string>): BMIData => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    if (Number(args[2]) !== 0 && Number(args[3]) !== 0) {
      return {
        h: Number(args[2]),
        w: Number(args[3])
      }
    }
    else {
      throw new Error('Provided values could not be 0!');  
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (data: BMIData): string => {
  const bmi = data.w / ((data.h / 100) ** 2);
  
  switch (true) {
    case (bmi >= 30):
      return 'Obese';
    case (bmi >= 25):
      return 'Overweight';
    case (bmi >= 18.5):
      return 'Normal (healthy weight)';
    case (bmi < 18.5):
      return 'Underweight';
    default:
      return 'Normal (healthy weight)';
  }
}

try {
  const input = parseArgumentsBmi(process.argv);
  console.log(calculateBmi(input));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
