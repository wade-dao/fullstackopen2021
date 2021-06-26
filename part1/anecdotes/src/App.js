import React, { useState } from 'react'

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const VoteCount = ({count}) => {
  return (
    <p>has {count} votes</p>
  )
}

const AnecdoteOfTheDay = ({selected, anecdotes, vote}) => {
  return (
    <div>
      <Header title="Anecdote of the day" />
      <p>{anecdotes[selected]}</p>
      <VoteCount count={vote[selected]} />
    </div>
  )
}

const MostVotesAnecdote = ({anecdotes, max}) => {
  return (
    <>
      <Header title="Anecdote with most votes" />
      <p>{anecdotes[max.index]}</p>
      <VoteCount count={max.value} />
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState([0, 0, 0, 0, 0, 0, 0])
  const [max, setMax] = useState({
    value: 0,
    index: 0
  })
  
  const randomIndex = () => {
    const idx = Math.floor(Math.random() * (anecdotes.length))
    return idx
  }

  const voteAction = () => {
    const copy = { ...vote }
    copy[selected] += 1

    setVote(copy)

    if (copy[selected] > max.value) {
      const newMax = {
        value: copy[selected],
        index: selected
      }
      setMax(newMax)
    }
  }

  return (
    <>
      <AnecdoteOfTheDay selected={selected} vote={vote} anecdotes={anecdotes} />
      <Button text="vote" handleClick={voteAction} />
      <Button text="next anecdote" handleClick={() => setSelected(randomIndex)} />
      <MostVotesAnecdote vote={vote} anecdotes={anecdotes} max={max}/>
    </>
  )
}

export default App