interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
