function Student(props) {
  return (
    <div>
      <p>Name: {props.name}</p>
      <p>Course: {props.course}</p>
      <p>Marks: {props.marks}</p>
      <hr />
    </div>
  );
}

export default Student;