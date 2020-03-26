import React from 'react'
import styled from 'styled-components'

const Dodge = ({level}) => {
  const [width, setWidth] = React.useState() // [px]
  const [activeBoxId, setActiveBoxId] = React.useState(3) // [1-5]
  const [spawnFrequency] = React.useState(5000) // [ms]
  const [speed] = React.useState(20) // [s]

  // K E Y P R E S S   E V E N T S
  React.useEffect(() => {
    const decreaseBoxId = (event) => {
      if (event.keyCode === 38) {
        setActiveBoxId(activeBoxId - 1)
      }
    }
    const increaseBoxId = (event) => {
      if (event.keyCode === 40) {
        setActiveBoxId(activeBoxId + 1)
      }
    }
    window.addEventListener('keydown', decreaseBoxId)
    window.addEventListener('keydown', increaseBoxId)
    return () => {
      window.removeEventListener('keydown', decreaseBoxId)
      window.removeEventListener('keydown', increaseBoxId)
    }
  }, [setActiveBoxId, activeBoxId]) 
  

  React.useEffect(() => {
    setWidth(document.getElementById("dodge").offsetWidth)
  }, [])

  // Spawn something
  React.useEffect(() => {
    // Spawn enemy depending on spawnFrequency
    const id = setInterval(() => {
      const enemyRow = Math.floor(Math.random() * 5) + 1
      const enemyDirection = Math.floor(Math.random() * 2) + 1
      const enemyId = 'pipe-' + enemyRow + '-' + (enemyDirection === 1 ? 'left' : 'right')
      const enemyElement = document.getElementById(enemyId)
      enemyElement.classList.add("move")
    }, spawnFrequency)
    return () => clearInterval(id)
    
  }, [spawnFrequency])

  return (
    <StyledDodge className={`level-${level}`} width={width} speed={speed} >
      <div className="wrapper" id="dodge">
        <div className="container">
          <div className="pipe left move" id="pipe-1-left"/>
          <div className="pipe right" id="pipe-1-right"/>
          <div className={`box first ${activeBoxId === 1 && 'active'}`} />
        </div>
        <div className="container">
          <div className="pipe left" id="pipe-2-left"/>
          <div className="pipe right" id="pipe-2-right"/>
          <div className={`box ${activeBoxId === 2 && 'active'}`} />
        </div>
        <div className="container">
          <div className="pipe left" id="pipe-3-left"/>
          <div className="pipe right" id="pipe-3-right"/>
          <div className={`box ${activeBoxId === 3 && 'active'}`} />
        </div>
        <div className="container">
          <div className="pipe left" id="pipe-4-left"/>
          <div className="pipe right" id="pipe-4-right"/>
          <div className={`box ${activeBoxId === 4 && 'active'}`} />
        </div>
        <div className="container">
          <div className="pipe left" id="pipe-5-left"/>
          <div className="pipe right" id="pipe-5-right"/>
          <div className={`box last ${activeBoxId === 5 && 'active'}`} />
        </div>
      </div>
    </StyledDodge>
  )
}

const StyledDodge = styled.div`
  position: fixed;
  overflow: hidden;
  top: 5px;
  right: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 0;
  height: calc(100vh - 10px);
  background-color: rgba(255, 255, 255, 0.1);
  transition: var(--transition);
  &.level-2, &.level-3, &.level-4 {
    width: calc((100% - 15px) / 2);
  }
  &.level-4 {
    height: calc((100vh - 15px) / 2);
  }
  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 300px;
    width: 100%;
    border-radius: 5px;
    overflow: hidden;
  }
  .container {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .pipe {
      position: absolute;
      height: 30px;
      width: 30px;
      background-color: white;
      border-radius: 5px;
      transform: rotate(45deg);
      &.left {
        left: -35px;
        &.move {
          @keyframes moveRight {
            from {
              transform : translate(0);
            }
            to {
              transform : translate(${props => props.width + 60}px);
            }
          }
          animation: moveRight ${props => props.speed}s linear;
        }
      }
      &.right {
        right: -35px;
        &.move {
          @keyframes moveLeft {
            from {
              transform : translate(0);
            }
            to {
              transform : translate(-${props => props.width + 60}px);
            }
          }
          animation: moveLeft 25s linear;
        }
      }
    }
    .box {
      height: 60px;
      width: 40px;
      background-color: var(--dark);
      &.first {
        border-radius: 5px 5px 0 0;
      }
      &.last {
        border-radius: 0 0 5px 5px;
      }
      &.active {
        background-color: var(--primary);
      }
    }
  }
`

export default Dodge
