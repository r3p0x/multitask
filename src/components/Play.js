import React from 'react'
import styled from 'styled-components'

const Play = ({gameTime, restartGame}) => {
  return (
    <StyledPlayModal>
      <h1>{gameTime && gameTime}</h1>
      <span>{gameTime && 'Your Score'}</span>
      <button 
        className='btn btn-play' 
        onClick={() => restartGame()}
      >
        <div>PLAY</div>
      </button>
    </StyledPlayModal>
  )
}

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

export default Play
