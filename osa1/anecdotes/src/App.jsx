import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return(
    <button onClick={handleClick}>{text}</button>
  )
}

const MostVotes = ({value, anecdote}) => {
  if(value > 0){
    return(
      <>
        <p>{anecdote}</p>
        <p>Has {value} votes</p>    
      </>
    )
  }
  return(
    <p>No votes cast</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const getPointsArray = () => {
    let arr = []
    for (let i = 0; i < anecdotes.length; i++) {
      arr = arr.concat(0)
    }
    return arr
  }
  const newArray = getPointsArray()

  const [selectedAnecdote, setSelected] = useState(anecdotes[0])
  const [id, setId] = useState(0)
  const [pointsArray, setPointsArray] = useState(newArray)
  const [maxPoints, setMaxPoints] = useState({points: 0, id:0})
  
  const newAnecdoteId = () => {
    let newId = Math.floor(Math.random() * anecdotes.length)
    while(newId === id){newId = Math.floor(Math.random() * anecdotes.length)}
    setId(newId)
    setSelected(anecdotes[newId])
  }

  const handleNewAnecdote = () => newAnecdoteId()
  const handleVote = () => {
    const arrayCopy = [...pointsArray]
    arrayCopy[id] += 1
    if(arrayCopy[id] > maxPoints.points) {setMaxPoints({points: arrayCopy[id], id:id})}
    setPointsArray(arrayCopy)
  }

  return (
    <div>
      <h3>Anecdote of the Day</h3>
      <p>{selectedAnecdote}</p>
      <p>Has {pointsArray[id]} votes</p>
      <Button handleClick={handleVote} text={"Vote"} />
      <Button handleClick={handleNewAnecdote} text={"New Anecdote"} />

      <h3>Anecdote with the most votes: </h3>
      <MostVotes value={maxPoints.points} anecdote={anecdotes[maxPoints.id]} />
    </div>
  )
}

export default App