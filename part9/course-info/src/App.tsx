import React from 'react';

const App = () => {
  const courseName = "Half Stack application development";
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
    type: string;
  }
  
  interface CoursePartBaseWDescription extends CoursePartBase {
    description: string;
  }

  interface CourseNormalPart extends CoursePartBaseWDescription {
    type: "normal";
  }

  interface CourseSubmissionPart extends CoursePartBaseWDescription {
    type: "submission";
    exerciseSubmissionLink: string;
  }

  interface CourseProjectPart extends CoursePartBase {
    type: "groupProject";
    groupProjectCount: number;
  }

  interface CourseSpeialPart extends CoursePartBaseWDescription {
    type: "special";
    requirements: Array<string>;
  }

  type CoursePart = CourseNormalPart | CourseSubmissionPart | CourseProjectPart | CourseSpeialPart;

  // this is the new coursePart variable
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ];

  const Part = (props: CoursePart) => {
    switch (props.type) {
      case "normal":
        return (
          <p>
            <div><strong>{props.name}</strong></div>
            <div><em>{props.description}</em></div>
          </p>
        )
      case "groupProject":
        return (
          <p>
            <div><strong>{props.name}</strong></div>
            <div>project exercises {props.groupProjectCount}</div>
          </p>
        )
      case "submission":
        return (
          <p>
            <div><strong>{props.name}</strong></div>
            <div><em>{props.description}</em></div>
            <div>submit to {props.exerciseSubmissionLink}</div>
          </p>
        )
      case "special":
        return (
          <p>
            <div><strong>{props.name}</strong></div>
            <div><em>{props.description}</em></div>
            <div>required skills: {props.requirements.join(', ')}</div>
          </p>
        )
    }
  };
  
  interface ContentProps {
    parts: CoursePart[];
  }
  
  const Content = (props: ContentProps) => {
    return (
      <>
        {props.parts.map(part => <Part key={part.name} {...part} />)}
      </>
    )
  }

  interface HeaderProps {
    name: string;
  }
  
  const Header = (props: HeaderProps) => {
    return (
      <h1>{props.name}</h1>
    )
  }

  interface TotalProps {
    parts: CoursePart[];
  }
  
  const Total = (props: TotalProps) => {
    return (
      <p>
          Number of exercises{" "}
          {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    )
  }

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;