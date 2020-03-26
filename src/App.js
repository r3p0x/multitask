import React from 'react'
import styled, { createGlobalStyle } from 'styled-components'

import DevLogs from './components/DevLogs'
import Play from './components/Play'
import Balance from './components/Balance'

function App() {
  const [gameOver, setGameOver] = React.useState(true)
  const [gameTime, setGameTime] = React.useState(null)
  const [level, setLevel] = React.useState(1)

  // G A M E   T I M E R 
  React.useEffect(() => {
    if (!gameOver) {
      const id = setInterval(() => {
        setGameTime(gameTime + 1)
      }, 1000)
      return () => clearInterval(id)
    }
  }, [gameTime, gameOver])

  React.useEffect(() => {
    if (gameTime === 5) {
      setLevel(2)
    }
    if (gameTime === 10) {
      setLevel(3)
    }
    if (gameTime === 15) {
      setLevel(4)
    }
  }, [gameTime])
  
  const restartGame = () => {
    setGameOver(false)
    setGameTime(0)
  }

  return (
    <StyledApp>
      <GlobalStyle />
      {gameOver && <Play gameTime={gameTime} restartGame={restartGame} />}
      <Balance gameOver={gameOver} setGameOver={setGameOver} level={level} />
      <DevLogs gameTime={gameTime} level={level} />
    </StyledApp>
  )
}

const StyledApp = styled.div`
  position: relative;
  background-color: #2e2e2e;
  height: 100vh;
  width: 100%;
`

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

export default App
