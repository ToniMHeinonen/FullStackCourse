interface HeaderProps {
  text: string;
}

interface ContentProps {
  name: string;
  exerciseCount: number;
}

interface TotalProps {
  courseParts: ContentProps[];
}

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
  const courseParts = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
    },
  ];

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
