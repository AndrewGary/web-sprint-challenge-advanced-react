import React, { useState, useEffect } from 'react'
import axios from 'axios';

const initialState = {
  x: 2,
  y: 2,
  steps: 0,
  email: ''
}

export default function AppFunctional(props) {
  
  const [ board, setBoard] = useState(initialState)

  const [ error, setError ] = useState('');

  const setActive = (x, y) => {
    const grid = document.getElementsByClassName('square');

    for(let i = 0; i < grid.length; i++){
      if(grid[i].classList.contains('active')){
        grid[i].classList.remove('active');
      }
      if(grid[i].textContent){
        grid[i].textContent = '';
      }
    }

    if(x === 1 && y === 1){
      grid[0].classList.add('active')
      grid[0].textContent = 'B'
    }
    if(x === 2 && y === 1){
      grid[1].classList.add('active')
      grid[1].textContent = 'B'
    }
    if(x === 3 && y === 1){
      grid[2].classList.add('active')
      grid[2].textContent = 'B'
    }
    if(x === 1 && y === 2){
      grid[3].classList.add('active')
      grid[3].textContent = 'B'
    }
    if(x === 2 && y === 2){
      grid[4].classList.add('active')
      grid[4].textContent = 'B'
    }
    if(x === 3 && y === 2){
      grid[5].classList.add('active')
      grid[5].textContent = 'B'
    }
    if(x === 1 && y === 3){
      grid[6].classList.add('active')
      grid[6].textContent = 'B'
    }
    if(x === 2 && y === 3){
      grid[7].classList.add('active')
      grid[7].textContent = 'B'
    }
    if(x === 3 && y === 3){
      grid[8].classList.add('active')
      grid[8].textContent = 'B'
    }
  }

  useEffect(() => {
    setActive(board.x, board.y)
  }, [board])
  
  const handleUpClick = () => {

    if(board.y === 1){
      setError("You can't go up");
    }else{
      if(error){
        setError('');
      }
      setBoard({...board,
        y: board.y -1,
        steps: board.steps + 1
      })
    }
  }

  const handleDownClick = () => {

    if(board.y === 3){
      setError("You can't go down");
    }else{
      if(error){
        setError('');
      }
      setBoard({...board,
        y: board.y +1,
        steps: board.steps + 1
      })
    }
  }

  const handleRightClick = () => {

    if(board.x === 3){
      setError("You can't go right");
    }else{
      if(error){
        setError('');
      }
      setBoard({...board,
        x: board.x +1,
        steps: board.steps + 1
      })
    }
  }

  const handleLeftClick = () => {
    console.log('handleLeftClick');
    if(board.x === 1){
      setError("You can't go left");
    }else{
      if(error){
        setError('');
      }
      setBoard({...board,
        x: board.x -1,
        steps: board.steps + 1
      })
    }
  }

  const handleResetClick = () => {
    console.log('handleResetClick');
    if(error){
      setError('')
    }
    setBoard(initialState);
  }
  
  const handleChange = (e) => {
    setBoard({
      ...board,
      email: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('handleSubmit');

    axios.post('http://localhost:9000/api/result', board)
    .then(resp => {
      console.log('board: ', board)
      console.log(resp.data.message);
      setError(resp.data.message);
      setBoard({
        ...board,
        email: ''
      })
    })
    .catch(error => {
      if( board.email === ''){
        setError('Ouch: email is required')
      }else if(board.email[board.email.length-4] !== '.'){
        setError('Ouch: email must be a valid email');
      }else{
        setError(`${board.email} failure #71`)
      }
      
    })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates: ({board.x}, {board.y})</h3>
        <h3 id="steps">You moved {board.steps} time{board.steps !== 1 ? 's' : ''}</h3>
      </div>
      <div id="grid">
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square active">B</div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
        <div className="square"></div>
      </div>
      <div className="info">
        <h3 id="message">{error}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={handleLeftClick}>LEFT</button>
        <button id="up" onClick={handleUpClick}>UP</button>
        <button id="right" onClick={handleRightClick}>RIGHT</button>
        <button id="down" onClick={handleDownClick}>DOWN</button>
        <button id="reset" onClick={handleResetClick}>reset</button>
      </div>
      <form>
        <input value={board.email} onChange={handleChange} id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit" onClick={handleSubmit}></input>
      </form>
    </div>
  )
}
