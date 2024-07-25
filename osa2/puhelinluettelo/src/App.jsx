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

const Notification = ({ notification }) => {
  if(notification === null){
    return null
  }
  if(notification.code === 1){
    return (
      <div className="error">
        {notification.message}
      </div>
    )
  }
  if(notification.code === 0){
    return (
      <div className="success">
        {notification.message}
      </div>
    )
  }
}

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterText, setFilterText] = useState('')
  const [filteredPersons, setFilteredPersons] = useState([])
  const [notification, setNotification] = useState(null)

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
        successMessage(`Successfully modified ${response.data.name}'s number`)
      })
      .catch(error => {
        errorMessage(`Couldn't edit number, phonebook entry does not exist`)
        const newPersons = persons.filter(p => p.id !== existingPerson.id)
        setPersons(newPersons)
        setFilteredPersons(newPersons)
        console.log('ERROR', error)
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
        successMessage(`Successfully added entry for ${response.data.name}`)
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
        successMessage(`Successfully deleted ${response.data.name}`)
      })
      .catch(error => {
        errorMessage(`Couldn't delete phonebook entry, entry does not exist`)
        const newPersons = persons.filter(p => p.id !== id)
        setPersons(newPersons)
        setFilteredPersons(newPersons)
        console.log('ERROR', error)
      })
    }
  }

  const successMessage = (message) => {
    notificationMessage(0,message)
  }

  const errorMessage = (message) => {
    notificationMessage(1,message)
  }

  const notificationMessage = (code, message) => {
    setNotification({code:code, message:message})
    setTimeout(()=> {
      setNotification(null)
    }, 5000)    
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
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