const Person = ({ person, personRemover }) => (
  <div>{person.name} {person.number} &nbsp;
  <input
    type="button" value="delete"
    onClick={() => {
      if (window.confirm(`Delete ${person.name} ?`))
        personRemover(person.id)
    }}
  />
  </div>
)

export default Person