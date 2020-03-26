import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

function App() {
  const [gameOver, setGameOver] = React.useState(true)
  const [gameTime, setGameTime] = React.useState(null)

  // B A L A N C E   S T A T E 
  const [tilt, setTilt] = React.useState(1)
  const [ballPosition, setBallPosition] = React.useState(0)

  // G A M E   O V E R 
  React.useEffect(() => {
    if (gameOver) {
    } else {
      const id = setInterval(() => {
        setGameTime(gameTime + 1)
      }, 1000)
      return () => clearInterval(id)
    }
  }, [gameTime, gameOver])

  // BALANCE 
  React.useEffect(() => {
    console.log('Position: checking...');
    if (!gameOver) {
      if (ballPosition < -150 || ballPosition > 150) {
        setGameOver(true)
        console.log('Position: Game Over')
      } else {
        const id = setInterval(() => {
          setBallPosition(ballPosition * 1.01 + tilt)
          console.log('Position: ', ballPosition)
        }, 100)
        return () => clearInterval(id)
      }
    }
    
  }, [ballPosition, gameOver, tilt])

  // KEYPRESS
  React.useEffect(() => {
    const decreaseTilt = (event) => {
      if (event.keyCode === 37) {
        setTilt(tilt - 1)
      }
    }
    const increaseTilt = (event) => {
      if (event.keyCode === 39) {
        setTilt(tilt + 1)
      }
    }
    window.addEventListener('keydown', decreaseTilt)
    window.addEventListener('keydown', increaseTilt)
    return () => {
      window.removeEventListener('keydown', decreaseTilt)
      window.removeEventListener('keydown', increaseTilt)
    }
  }, [tilt]) 

  const restartGame = () => {
    setGameOver(false)
    setBallPosition(0)
    setTilt(1)
  }

  return (
    <StyledApp>
      {gameOver && (
        <StyledPlayModal>
          <h1>{gameTime && gameTime}</h1>
          <span>{gameTime && 'Your Score'}</span>
          <button className='btn btn-play' onClick={() => restartGame()}>
            <div>PLAY</div>
          </button>
        </StyledPlayModal>
      )}
      <GlobalStyle />
      <StyledBalance>
        <div
          className='container'
          style={{ transform: 'rotate(' + tilt + 'deg)' }}
        >
          <div
            className='ball'
            style={{ transform: 'translate(' + ballPosition + 'px)' }}
          ></div>
          <div className='bar'></div>
        </div>
      </StyledBalance>
      <StyledDevLogs>
        <div className='log'>
          <span className='label'>Status</span>
          <span className='output'>
            {gameOver ? 'Game Over' : 'Gambling...'}
          </span>
        </div>
        <div className='log'>
          <span className='label'>Game Time</span>
          <span className='output'>{gameTime}</span>
        </div>
        <div className='log'>
          <span className='label'>Balance • Tilt</span>
          <span className='output'>{tilt}</span>
        </div>
        <div className='log'>
          <span className='label'>Balance • Ball Position</span>
          <span className='output'>{ballPosition.toFixed(2)}</span>
        </div>
      </StyledDevLogs>
    </StyledApp>
  )
}

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
  }
  h1 {
    color: white;
  }
  button {
    height: 50px;
    width: 50px;
    border-radius: 5px;
    background-color: rgba(0,0,0,0.25);
    border: none;
    color: white;
    transition: var(--transition);
    cursor: pointer;
    &:hover {
      background-color: rgba(0,0,0,0.5);
    }
  }
  .game-controls {
    position: fixed;
    bottom: 50px;
    right: 50px;
    button {
      margin-left: 25px;
      font-weight: bold;
      font-size: 20px;
    }
  }
  :root {
    --transition: all ease-in-out 200ms;
    --primary: #00e4c4;
    --dark: #2e2e2e;
  }
`

const StyledApp = styled.div`
  background-color: #2e2e2e;
  height: 100vh;
  width: 100%;
`

const StyledPlayModal = styled.div`
  background-color: rgba(0, 0, 0, 0.9);
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    font-size: 128px;
    margin-bottom: -15px;
  }
  span {
    color: white;
    font-size: 16px;
    text-transform: uppercase;
    font-weight: 800;
    letter-spacing: 0.05em;
    opacity: 0.5;
  }
  .btn.btn-play {
    height: 300px;
    width: 300px;
    margin-top: 50px;
    background-color: var(--dark);
    border-radius: 50%;
    outline: none;
    cursor: pointer;
    transition: var(--transition);
    &:hover {
      background-color: var(--primary);
      transform: scale(1.05);
      div {
        transform: scale(1.25);
        letter-spacing: 0.1em;
      }
    }
    div {
      font-size: 42px;
      font-weight: 800;
      letter-spacing: 0.05em;
      transition: var(--transition);
    }
  }
`

const StyledDevLogs = styled.div`
  width: 300px;
  background-color: rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  position: fixed;
  bottom: 50px;
  left: 50px;
  color: white;
  padding: 25px;
  .log {
    display: flex;
    flex-direction: column;
    margin-bottom: 25px;
    &:last-child {
      margin-bottom: 0;
    }
    .label {
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      opacity: 0.5;
    }
    .output {
      font-size: 21px;
      font-weight: 800;
    }
  }
`

const StyledBalance = styled.div`
  height: 100vh;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  .container {
    position: relative;
    transition: all ease-in-out 200ms;
    .ball {
      position: absolute;
      height: 50px;
      width: 50px;
      background-color: var(--primary);
      border-radius: 100%;
      top: -50px;
      left: calc(50% - 25px);
      transition: all ease-in-out 200ms;
    }
    .bar {
      width: 300px;
      height: 40px;
      background-color: var(--dark);
      border-radius: 5px;
    }
  }
`

export default App
