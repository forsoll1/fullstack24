import { useState, useEffect } from 'react'
import personService from './services/persons'

const Persons = ({persons, deletePerson}) => {
  return(
      persons.map(person => 
        <div key={person.id}>{person.name}: {person.number}  <button onClick={() => deletePerson(person.id)}>delete</button> </div>
      )
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

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])

  useEffect(() => {
    personService
    .getAll()
    .then(response => {
      setPersons(response.data)
      setFilteredPersons(response.data)
    })
  }, [])


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

    const existingPerson = persons.find(p => p.name === newName)
    if(existingPerson && window.confirm(`${newName} has already been added to the phonebook, replace the old number with the new one?`)){
      personService
      .put(existingPerson.id, {...existingPerson, number:newNumber})
      .then(response => {
        const newPersons = persons.map(person => person.id !== response.data.id ? person : response.data)
        setPersons(newPersons)
        setFilteredPersons(newPersons)
      })
    }
    if(!existingPerson){
      const newPerson = { 
        name:newName,
        number:newNumber
      }
      personService
      .create(newPerson)
      .then(response => {
        const newPersons = persons.concat(response.data)
        setPersons(newPersons)
        setFilteredPersons(newPersons)
      })
      setFilterText('')
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = id => {
    const person = persons.find(p => p.id === id)
    if(confirm(`Are you sure you want to delete ${person.name}?`)){
      personService
      .deleteItem(id)
      .then(response => {
        const newPersons = persons.filter(p => p.id !== response.data.id)
        setPersons(newPersons)
        setFilteredPersons(newPersons)
      })
    }
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
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )

}

export default App