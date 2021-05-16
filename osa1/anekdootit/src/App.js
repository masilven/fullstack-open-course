import React, { useState } from 'react'

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Anecdote = ({text, votes}) => (
  <div>
    {text}<br/>
    has {votes} votes
  </div>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  // Simple pseudo random integer generator from 0 inclusive to max exclusive
  const randomInt = (max) => {
    return Math.floor(max*Math.random())
  }

  const points = Array.apply(
      null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  
  const [selected, setSelected] = useState(randomInt(anecdotes.length))
  const [votes, setVotes] = useState(points)
  const [mostVoted, setMostVoted] = useState(0)

  const addPoint = () => {
    // console.log(votes)
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)

    // Check if most voted anecdote should be updated
    if (copy[selected] >= copy[mostVoted])
      setMostVoted(selected)
    // console.log(copy[selected], copy[mostVoted], mostVoted)
  }

  const switchAnecdote = () => {
    setSelected(randomInt(anecdotes.length))
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={addPoint} text="vote" />
      <Button handleClick={switchAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
      <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
    </div>
  )
}

export default App