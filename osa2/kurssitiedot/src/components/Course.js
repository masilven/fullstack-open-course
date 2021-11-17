import React from 'react'

const Header = (props) => {
  return (
      <h2>{props.course}</h2>
  )
}

const Part = (props) => {
  return (
      <p>
        {props.name} {props.exercises}
      </p>
  )
}

const Content = ({ parts }) => {
  return (
      <div>
        {parts.map((part) =>
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        )}
      </div>
  )
}

const Total = ({ parts }) => {
  // Get total number of exercises
  const reducer = (s, part) => {
    // console.log(s, part)
    return (s + part.exercises)
  }
  const total = parts.reduce(reducer, 0)

  return (
    <p>
      <b>Total of {total} exercises</b>
    </p>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course