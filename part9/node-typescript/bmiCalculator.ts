const calculateBmi = (height: number, weight: number): string => {
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

console.log(calculateBmi(180, 74));
