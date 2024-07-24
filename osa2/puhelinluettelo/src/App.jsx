import { useState } from 'react'


const Persons = ({persons}) => {
  return(
    <div>
      {persons.map(person => <p key={person.name}>{person.name}: {person.number}</p>)}
    </div>
  )
}

const PersonForm = ({handleSubmit, handleNameInput, handleNumberInput, newName, newNumber}) => {
  return(
    <form onSubmit={handleSubmit}>
    <div>
      name: <input onChange={handleNameInput} value={newName} />
      <br />
      number: <input onChange={handleNumberInput} value={newNumber} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = ({handleFilterInput, filterText}) => {
  return(
    <div>
      Filter names with: <input onChange={handleFilterInput} value={filterText}/>
    </div>
  )
}

const App = () => {

  const premade = [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]

  const [persons, setPersons] = useState(premade)
  const [filteredPersons, setFilteredPersons] = useState(premade)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')

  const handleNameInput = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberInput = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterInput = (event) => {
    setFilterText(event.target.value)
    setFilteredPersons(persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase())))      
  }

  const handleSubmit = (event) =>{
    event.preventDefault()

    const names = persons.map(p => p.name)
    if(names.includes(newName)){
      window.alert(`${newName} has already been added to the phonebook!`)
      setNewName('')
      setNewNumber('')
      return
    }
    const newPersons = persons.concat({ 
      name:newName,
      number:newNumber
     })
    setPersons(newPersons)
    setFilteredPersons(newPersons)
    setNewName('')
    setNewNumber('')
    setFilterText('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterInput={handleFilterInput} filterText={filterText} />
      
      <h2>Add new number</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleNameInput={handleNameInput}
        handleNumberInput={handleNumberInput}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )

}

export default App