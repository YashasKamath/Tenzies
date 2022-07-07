import './App.css';
import Die from './Components/Die';
import {useEffect, useState} from 'react'
import {nanoid} from 'nanoid'

export default function App() {

  function allNewDice(){
    let arr=[]
    for(let i=0;i<10;i++)
    arr[i]={
      value:Math.ceil(Math.random()*6),
      isHeld:false,
      id:nanoid()
    }
    return arr
  }

  const [diceArray,setDiceArray]=useState(allNewDice())
  const [rolls,setRolls]=useState(0)
  const [bestRollCount,setBestRollCount]=useState(
    JSON.parse(localStorage.getItem('achievement')) || 10000
  )

  const dice=diceArray.map(x=>{
    return (
      <Die
        value={x.value}
        isHeld={x.isHeld}
        key={x.id}
        handleClick={handleClick}
        id={x.id}
      />
  )})

  function roll(){
    if(!tenzies){
      setDiceArray(oldDice=>oldDice.map(oldDie=>({
        ...oldDie,
        value: oldDie.isHeld ? oldDie.value:Math.ceil(Math.random()*6)
      })))
      setRolls(prevRolls=>prevRolls+1)
    }
    else {
      setTenzies(false)
      setDiceArray(allNewDice)
      setRolls(0)
    }
  }

  function handleClick(diceId){
    setDiceArray(oldDice=>oldDice.map(x=>({
      ...x,
      isHeld: !tenzies && diceId===x.id? !x.isHeld:x.isHeld
    })))
  }

  const [tenzies, setTenzies] = useState(false)
  
  useEffect(()=>{
    const value=diceArray[0].value
    const allHeld=diceArray.every(die => die.isHeld)
    const allValuesSame=diceArray.every(die=>die.value===value)
    setTenzies(allHeld && allValuesSame)
  },[diceArray])

  useEffect(()=>{
    if(tenzies){
      setBestRollCount(prevRolls=>prevRolls>rolls?rolls:prevRolls)
      localStorage.setItem('achievement',bestRollCount)
    }
  },[tenzies])

  return (
    <main>
      <h1>Tenzies</h1>
      <p>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='grid-container'>
        {dice}
      </div>
      {tenzies && <h3>You won with {rolls} rolls!!</h3>}
      {tenzies && <h4>Best score: {JSON.parse(bestRollCount)}</h4>}
      <button onClick={roll} className='roll'>{tenzies? 'New Game' : 'Roll'}</button>
    </main>
  );
}

