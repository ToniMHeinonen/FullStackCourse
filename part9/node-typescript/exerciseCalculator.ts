interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface ExerciseArguments {
  target: number;
  hours: Array<number>;
}

const parseExerciseArguments = (args: Array<string>): ExerciseArguments => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const [arg1, arg2, argTarget, ...argHours] = args;

  const target = Number(argTarget);
  const hours = argHours.map((h) => Number(h));

  if (isNaN(target)) throw new Error('Target was not a number!');

  hours.forEach((h) => {
    if (isNaN(h)) throw new Error('Provided hours were not numbers!');
  });

  return { target, hours };
};

const calculateAverage = (array: Array<number>): number =>
  array.reduce((a, b) => a + b) / array.length;

const calculateExercises = (hours: Array<number>, target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter((d) => d !== 0).length;
  const average = calculateAverage(hours);
  const success = average >= target;
  let rating, ratingDescription;

  if (success) {
    rating = 3;
    ratingDescription = 'Awesome work';
  } else if (target - average < 0.5) {
    rating = 2;
    ratingDescription = 'Not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'Utter failure';
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

try {
  const { target, hours } = parseExerciseArguments(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}
