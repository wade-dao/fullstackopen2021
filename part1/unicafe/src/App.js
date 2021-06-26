import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Statistic = ({text, value, pct}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}{pct}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const goodScore = 1
  const neutralScore = 0
  const badScore = -1

  if (good + neutral + bad > 0)
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={good + neutral + bad} />
          <Statistic text="average" value={(good * goodScore + neutral * neutralScore + bad * badScore)/ (good + neutral + bad)} />
          <Statistic text="positive" value={good / (good + neutral + bad) * 100} pct=" %" />
        </tbody>
      </table>
    )
  return (
    <p>No feedback given</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title="give feedback" />
      <Button name="good" handleClick={() => setGood(good + 1)} />
      <Button name="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button name="bad" handleClick={() => setBad(bad + 1)} />
      <Header title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App