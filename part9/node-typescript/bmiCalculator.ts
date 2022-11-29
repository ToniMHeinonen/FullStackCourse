interface BmiValues {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (weight <= 0 || height <= 0)
    throw new Error('Values must be higher than 0!');

  const meters = height / 100;
  const bmi = weight / Math.pow(meters, 2);

  if (bmi < 16) return 'Underweight (Severe thinness)';
  else if (bmi < 17) return 'Underweight (Moderate thinness)';
  else if (bmi < 18.5) return 'Underweight (Mild thinness)';
  else if (bmi < 25) return 'Normal (healthy weight)';
  else if (bmi < 30) return 'Overweight (Pre-obese)';
  else if (bmi < 35) return 'Obese (Class I)';
  else if (bmi < 40) return 'Obese (Class II)';
  else return 'Obese (Class III)';
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}

export default calculateBmi;
