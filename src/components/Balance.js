import React from 'react'
import styled from 'styled-components'

const Balance = ({gameOver, setGameOver, level}) => {
    const [tilt, setTilt] = React.useState(1)
    const [ballPosition, setBallPosition] = React.useState(0)

  React.useEffect(() => {
    if (!gameOver) {
      if (ballPosition < -150 || ballPosition > 150) {
        setGameOver(true)
      } else {
        const id = setInterval(() => {
          setBallPosition(ballPosition * 1.01 + tilt)
          setTilt(tilt + (ballPosition / 300))
        }, 10000)
        return () => clearInterval(id)
      }
    } else {
      setBallPosition(0)
      setTilt(1)
    }
    
  }, [ballPosition, gameOver, tilt, setGameOver])

  // K E Y P R E S S   E V E N T S
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
    
  return (
    <StyledBalance className={`level-${level}`}>
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
  )
}

const StyledBalance = styled.div`
  position: fixed;
  overflow: hidden;
  top: 5px;
  left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 10px);
  width: calc(100% - 10px);
  background-color: rgba(255, 255, 255, 0.1);
  transition: var(--transition);
  &.level-2 {
    width: calc((100% - 15px) / 2);
  }
  &.level-3, &.level-4 {
    width: calc((100% - 15px) / 2);
    height: calc((100vh - 15px) / 2);
  }
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

export default Balance
