import { useState } from 'react'

const Button = ({ handleClick, text }) => {
  return <button onClick = {handleClick}>{text}</button>
}

const Statistics = ( {good, neutral, bad, all, average, positive} ) => {
  if(all>0){
    return (
      <table>
        <tbody>
          <StatisticLine value={good} text="Good" />
          <StatisticLine value={neutral} text="Neutral" />
          <StatisticLine value={bad} text="Bad" />
          <StatisticLine value={all} text="All" />
          <StatisticLine value={average} text="Average" />
          <StatisticLine value={positive} text="Positive" />
        </tbody>
      </table>
    )
  }
  return <p>No feedback given</p>
}

const StatisticLine = ( { value, text } ) => {
    return <tr><td>{text}: </td><td>{value}</td></tr>
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
  }

  const average = (good - bad)/all
  const positive = `${good/all*100} %`
  

  return (
    <>
      <h2>Give Feedback</h2>
      <Button handleClick={handleGood} text={"Good"}/>
      <Button handleClick={handleNeutral} text={"Neutral"}/>
      <Button handleClick={handleBad} text={"Bad"}/>
      <br />
      <h2>Stats:</h2>
      <Statistics bad={bad} good={good} neutral={neutral} all={all} average={average} positive={positive}/>
    </>
  )
}

export default App
