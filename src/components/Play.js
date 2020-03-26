import React from 'react'
import styled from 'styled-components'

import github from '../assets/github.svg'
import heart from '../assets/heart.svg'

const Play = ({gameTime, restartGame}) => {
  return (
    <StyledPlayModal>
      <div className="header">
        <h2>Multitask</h2>
        <div className="socials">
          <a href="https://github.com/r3p0x">
            <img src={github} alt=""/>
          </a>
        </div>
      </div>
      {gameTime && 
        <>
          <h1>{gameTime}</h1>
          <span>'Your Score'</span>
        </>
      }
      <button 
        className='btn btn-play' 
        onClick={() => restartGame()}
      >
        <div>PLAY</div>
      </button>
      <div className="footer">
        <span>Made by</span>
        <img src={heart} alt=""/>
        <a href="https://twitter.com/r3p0x">r3p0x</a>
      </div>
    </StyledPlayModal>
  )
}

const StyledPlayModal = styled.div`
  background-color: var(--darker);
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
  .header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    h2 {
      color: var(--primary);
    }
    .socials {
      display: flex;
      a {
        cursor: pointer;
        transition: var(--transition);
        color: #efefef;
        img, svg {
          color: #efefef;
          height: 30px;
        }
        &:hover {
          transform: scale(1.2);
        }
      }
    }
  }
  h1 {
    font-size: 124px;
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
  .footer {
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translate(-50%);
    span {
      font-size: 14px;
      opacity: 1;
    }
    img {
      height: 20px;
      margin: 0 8px -4px;
    }
    a {
      font-size: 14px;
      text-transform: uppercase;
      font-weight: 800;
      color: var(--primary);
    }
  }
`

export default Play
