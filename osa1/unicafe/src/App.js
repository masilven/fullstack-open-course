import React, { useState } from 'react'

const StatisticLine = ({text, value}) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Statistics = ({good, neutral, bad}) => {
  const heading = <h1>statistics</h1>
  const all = good + neutral + bad

  // If no feedback has been given, show alternative message
  if (all === 0)
    return (<div>{heading} No feedback given</div>)

  return (
    <div>
      {heading}
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={(good - bad)/all} />
          <StatisticLine text="positive" value={(100*good/all) + " %"} />
        </tbody>
      </table>
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  // save buttons in their own states
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {
    setGood(good + 1)
  }

  const addNeutral = () => {
    setNeutral(neutral + 1)
  }

  const addBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={addGood} text="good" />
      <Button handleClick={addNeutral} text="neutral" />
      <Button handleClick={addBad} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App