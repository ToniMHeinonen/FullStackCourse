interface HeaderProps {
  text: string;
}

interface ContentProps {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  courseParts: CoursePartBase[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase {
  name: 'Fundamentals';
  description: string;
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase {
  name: 'Deeper type usage';
  description: string;
  exerciseSubmissionLink: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree;

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Header = (props: HeaderProps) => <h1>{props.text}</h1>;

const Content = (props: ContentProps) => (
  <p>
    {props.name} {props.exerciseCount}
  </p>
);

const Total = (props: TotalProps) => (
  <p>
    Number of exercises{' '}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
    },
  ];

  courseParts.forEach((part) => {
    switch (part.name) {
      case 'Fundamentals':
        // TypeScript knows that we can use name, exerciseCount and description
        break;
      case 'Using props to pass data':
        // TypeScript knows that we can use name, exerciseCount and groupProjectCount
        break;
      case 'Deeper type usage':
        // TypeScript knows that we can use name, exerciseCount, description and exerciseSubmissionLink
        break;
      default:
        // Makes sure that all names are implemented in this switch statement
        return assertNever(part);
    }
  });

  return (
    <div>
      <Header text={courseName} />
      {courseParts.map((c) => (
        <Content
          key={c.name}
          name={c.name}
          exerciseCount={c.exerciseCount}
        ></Content>
      ))}
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
