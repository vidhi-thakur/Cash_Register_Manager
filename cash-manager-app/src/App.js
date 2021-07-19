import { useState } from "react"
import './App.css';

function App() {

  const [display, setDisplay] = useState(false)
  const [result, setResult] = useState(false)
  const [billInput, setBillInput] = useState("")
  const [cashInput, setCashInput] = useState("")
  const [error, setError] = useState(false)
  const [array, setArray] = useState([])

  const onClickHandlerOne = () => {
    if (billInput === "") {
      setError("Enter a valid amount")
    } else {
      setDisplay(true)
      setError(false)
    }
  }

  const onClickHandlerTwo = () => {
    if (cashInput === "") {
      setError("Enter a valid given cash")
    }
    else if ((cashInput - billInput)<0) {
      setResult(false)
      setError("Given cash should be more than the amount")
    }
    else {
      setError(false)
      setResult(true)
      var amount = cashInput - billInput
      let notes = [2000, 500, 100, 20, 10, 5, 1]
      let change = Array(7).fill(0)
      for (var i = 0; i < notes.length; i++) {
        if (amount >= notes[i]) {
          change[i] =  Math.floor(amount / notes[i]);
          amount = amount - change[i] * notes[i];
        }
      }
      setArray(change)
      console.log(array)
    }

  }

  return (
    <div className="app">
      <h2 className="app__heading">Cash Register Manager</h2>
      <p className="mb-2">Enter the bill amount and cash given by the customer and know minimum number of notes to return.</p>
      <div className="app__label">Bill Amount:</div>
      <input value={billInput} onChange={(e) => setBillInput(e.target.value)} className="app__input" type="number" placeholder="Enter amount" />
      {!display && <button onClick={onClickHandlerOne} className="app__button">NEXT</button>}
      {
        display && <>
          <div className="app__label">Cash Given:</div>
          <input value={cashInput} onChange={(e) => setCashInput(e.target.value)} className="app__input" type="number" placeholder="Enter given cash" />
          <button onClick={onClickHandlerTwo} className="app__button">CHECK</button>
          {result && <div className="app__result">
            <div className="app__label">Return Change:</div>
            <table className="app__resultTable">
              <tbody>
                <tr key="row-1">
                  <td>No. of notes</td>
                  <td className="bg-w">{array[0]}</td>
                  <td className="bg-w">{array[1]}</td>
                  <td className="bg-w">{array[2]}</td>
                  <td className="bg-w">{array[3]}</td>
                  <td className="bg-w">{array[4]}</td>
                  <td className="bg-w">{array[5]}</td>
                  <td className="bg-w">{array[6]}</td>
                </tr>
                <tr key="row-2">
                  <td>Note</td>
                  <td>2000</td>
                  <td>500</td>
                  <td>100</td>
                  <td>20</td>
                  <td>10</td>
                  <td>5</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </div>}
        </>
      }
      {error && <div style={{ paddingBottom: "2rem" }}>{error}</div>}
    </div>
  );
}

export default App;
