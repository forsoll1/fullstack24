const Course = ({courses}) => {
    return (
        courses.map(course => 
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts}/>
          </div>
        )
    )
}

const Header = (props) => {
    return(
        <>
        <h1>{props.course}</h1>
        </>
    )
  }
  
const Part = (props) => {
    return(
        <>
        <p>
            {props.part.name} {props.part.exercises}
        </p>
        </>
    )
}
  
const Content = ({parts}) => {
    return(
        parts.map(part => 
        <div key={part.id}>
            <Part part={part} />
        </div>
        )
    )
}
  
  const Total = ({ parts }) => {
    const total = parts.reduce( (acc, part) => acc + part.exercises, 0)
    return(
      <>
        <h5>Total of {total} exercises</h5>
      </>
    )
  }

export default Course