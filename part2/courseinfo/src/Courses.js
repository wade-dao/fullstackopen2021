import React from 'react'

const CourseTitle = ({name}) => {
    return (
        <h2>{name}</h2>
    )
}


const Content = ({course}) => {
    const mapParts = course.parts.map(part => <Part key= {part.id} name={part.name} ex={part.exercises} />)
    return (
        <>
            {mapParts}
        </>
    )
}


const Part = ({name, ex}) => {
    return (
      <p>
        {name} {ex}
      </p>  
    )
}

  
const Total = ({course}) => {
    const total = course.parts.reduce((sum, part) => {
        return sum + part.exercises
    }, 0)

    return (
        <strong>total of {total} exercises</strong>
    )
}


const Course = ({course}) => {
    return (
      <div>
        <CourseTitle name={course.name} />
        <Content course={course} />
        <Total course={course} />
      </div>
    )
}


const Courses = ({courses}) => {
    const mapCourse = courses.map(course => <Course key= {course.id} course={course}/>)
    return (
        <>
            {mapCourse}
        </>
    )
}

export default Courses