import React from 'react'
import axios from 'axios';

const initialState = {
  error: '',
  x: 2,
  y: 2,
  steps: 0,
  email: ''
}
export default class AppClass extends React.Component {
 state = initialState;

  setActive = (x, y) => {
    const grid = document.getElementsByClassName('square');

    for(let i = 0; i < grid.length; i++){
      if(grid[i].classList.contains('active')){
        grid[i].classList.remove('active');
      }
      if(grid[i].textContent){
        grid[i].textContent = '';
      }
    }

    if(this.state.x === 1 && this.state.y === 1){
      grid[0].classList.add('active')
      grid[0].textContent = 'B'
    }
    if(this.state.x === 2 && this.state.y === 1){
      grid[1].classList.add('active')
      grid[1].textContent = 'B'
    }
    if(this.state.x === 3 && this.state.y === 1){
      grid[2].classList.add('active')
      grid[2].textContent = 'B'
    }
    if(this.state.x === 1 && this.state.y === 2){
      grid[3].classList.add('active')
      grid[3].textContent = 'B'
    }
    if(this.state.x === 2 && this.state.y === 2){
      grid[4].classList.add('active')
      grid[4].textContent = 'B'
    }
    if(this.state.x === 3 && this.state.y === 2){
      grid[5].classList.add('active')
      grid[5].textContent = 'B'
    }
    if(this.state.x === 1 && this.state.y === 3){
      grid[6].classList.add('active')
      grid[6].textContent = 'B'
    }
    if(this.state.x === 2 && this.state.y === 3){
      grid[7].classList.add('active')
      grid[7].textContent = 'B'
    }
    if(this.state.x === 3 && this.state.y === 3){
      grid[8].classList.add('active')
      grid[8].textContent = 'B'
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.x !== this.state.x ||
       prevState.y !== this.state.y){
         this.setActive(this.state.x, this.state.y);
       }
  }

  handleUpClick = () => {
    console.log('handleUpClick');
    if(this.state.y === 1){
      this.setState({
        ...this.state,
        error: "You can't go up"
      })
    }else{
      this.setState({
        ...this.state,
        error: '',
        y: this.state.y -1,
        steps: this.state.steps+1
      })
    }
  }

  handleDownClick = () => {
    console.log('handleDownClick');
    if(this.state.y === 3){
      this.setState({
        ...this.state,
        error: "You can't go down"
      })
    }else{
      this.setState({
        ...this.state,
        error: '',
        y: this.state.y +1,
        steps: this.state.steps+1
      })
    }
  }

  handleLeftClick = () => {
    console.log('handleLeftClick');
    if(this.state.x === 1){
      this.setState({
        ...this.state,
        error: "You can't go left"
      })
    }else{
      this.setState({
        ...this.state,
        error: '',
        x: this.state.x -1,
        steps: this.state.steps+1
      })
    }
  }

  handleRightClick = () => {
    console.log('handleRightClick');
    if(this.state.x === 3){
      this.setState({
        ...this.state,
        error: "You can't go right"
      })
    }else{
      this.setState({
        ...this.state,
        error: '',
        x: this.state.x +1,
        steps: this.state.steps+1
      })
    }
  }

  handleReset = () => {
    console.log('handleReset');
    this.setState(initialState);
  }

  handleChange = e => {
    this.setState({
      ...this.state,
      email: e.target.value
    })
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('handleSubmit');



    axios.post('http://localhost:9000/api/result', { x: this.state.x, y: this.state.y, steps: this.state.steps, email: this.state.email })
    .then(resp => {
      console.log('resp: ', resp)
      this.setState({
        ...this.state,
        error: resp.data.message,
        email: ''
      })
    })
    .catch(error => {
      console.log('error: ', error);
      this.setState({
        ...this.state,
        error: `${this.state.email} failure #23`,
        email: ''
      })
    })

  }


  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates ({this.state.x}, {this.state.y})</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
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
          <h3 id="message">{this.state.error}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleLeftClick} id="left">LEFT</button>
          <button onClick={this.handleUpClick} id="up">UP</button>
          <button onClick={this.handleRightClick} id="right">RIGHT</button>
          <button onClick={this.handleDownClick} id="down">DOWN</button>
          <button onClick={this.handleReset} id="reset">reset</button>
        </div>
        <form>
          <input onChange={this.handleChange} id="email" type="email" placeholder="type email"></input>
          <input onClick={this.handleSubmit} id="submit" type="submit"></input>
        </form>
      </div>
    )
  }
}
