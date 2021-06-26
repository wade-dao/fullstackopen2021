import React from 'react'

const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Part = ({name, ex}) => {
  return (
    <p>
      {name} {ex}
    </p>  
  )
}

const Content = ({course}) => {
  let partsComponent = []
  course.parts.forEach((item) => {
    partsComponent.push(<Part key= {item.id} name={item.name} ex={item.exercises} />)  
  })

  return (
    <>
      {partsComponent}
    </>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((sum, part) => {
    // console.log("hello ", sum, part.exercises)
    return sum + part.exercises
  }, 0)

  return (
    <strong>total of {total} exercises</strong>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App