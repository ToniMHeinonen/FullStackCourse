const Header = (props) => <h1>{props.course.name}</h1>;

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
);

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </>
  );
};

const Total = (props) => {
  let total = 0;
  const t = props.parts.forEach((value) => (total += value.exercises));

  return <p>Number of exercises {total}</p>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default Course;
