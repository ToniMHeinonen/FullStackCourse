import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const Stat = ({ name, amount }) => (
  <p>{name} {amount}</p>
)

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / all
  const positive = good / all * 100 + " %"

  return (
    <>
      <h1>statistics</h1>
      <Stat name="good" amount={good} />
      <Stat name="neutral" amount={neutral} />
      <Stat name="bad" amount={bad} />
      <Stat name="all" amount={all} />
      <Stat name="average" amount={average} />
      <Stat name="positive" amount={positive} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = ((good * 1) + (neutral * 0) + (bad * -1)) / all
  const positive = good / all * 100 + " %"

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App