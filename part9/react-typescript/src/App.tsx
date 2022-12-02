interface HeaderProps {
  text: string;
}

interface CourseProps {
  courseParts: CoursePart[];
}

interface PartProps {
  coursePart: CoursePart;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartBaseDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartBaseDescription {
  type: 'normal';
}

interface CourseProjectPart extends CoursePartBase {
  type: 'groupProject';
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartBaseDescription {
  type: 'submission';
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartBaseDescription {
  type: 'special';
  requirements: string[];
}

type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

const Header = (props: HeaderProps) => <h1>{props.text}</h1>;

const Content = (props: CourseProps) => (
  <div>
    {props.courseParts.map((c) => (
      <Part key={c.name} coursePart={c} />
    ))}
  </div>
);

const Total = (props: CourseProps) => (
  <p>
    Number of exercises{' '}
    {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const Part = (props: PartProps) => {
  const part = props.coursePart;
  switch (part.type) {
    case 'normal':
      return (
        <p>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <i>{part.description}</i>
          </div>
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>project exercises {part.groupProjectCount}</div>
        </p>
      );
    case 'submission':
      return (
        <p>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>submit to {part.exerciseSubmissionLink}</div>
        </p>
      );
    case 'special':
      return (
        <p>
          <div>
            <strong>
              {part.name} {part.exerciseCount}
            </strong>
          </div>
          <div>
            <i>{part.description}</i>
          </div>
          <div>
            required skills: {part.requirements.map((r) => r).join(', ')}
          </div>
        </p>
      );
    default:
      return assertNever(part);
  }
};

const App = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is the easy course part',
      type: 'normal',
    },
    {
      name: 'Advanced',
      exerciseCount: 7,
      description: 'This is the hard course part',
      type: 'normal',
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3,
      type: 'groupProject',
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
      type: 'submission',
    },
    {
      name: 'Backend development',
      exerciseCount: 21,
      description: 'Typing the backend',
      requirements: ['nodejs', 'jest'],
      type: 'special',
    },
  ];

  return (
    <div>
      <Header text={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default App;
