import Person from './Person'

const Persons = ({ persons, filterValue, personRemover }) => (
  <div>
    {persons.filter(
      person => person.name.toUpperCase().indexOf(
        filterValue.toUpperCase()) !== -1)
     .map((person) => (
      <Person key={person.name} person={person} personRemover={personRemover} />
    ))}
  </div>
)

export default Persons