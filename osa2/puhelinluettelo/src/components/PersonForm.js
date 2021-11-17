const PersonForm = ({ nameValue, nameChangeHandler,
                      numberValue, numberChangeHandler, personAdder }) => (
  <form>
    <div>
      name: <input value={nameValue} onChange={nameChangeHandler} /><br/>
      number: <input value={numberValue} onChange={numberChangeHandler} />
    </div>
    <div>
      <button type="submit" onClick={personAdder}>add</button>
    </div>
  </form>
)

export default PersonForm