import React from 'react'
import styled from 'styled-components'

const DevLogs = ({gameTime, level}) => {
  return (
    <StyledDevLogs>
      <div className='log'>
        <span className='output'>{level}</span>
        <span className='label'>Level</span>
      </div>
      <div className='log'>
        <span className='output'>{gameTime || 0}</span>
        <span className='label'>Score</span>
      </div>
    </StyledDevLogs>
  )
}

const StyledDevLogs = styled.div`
  position: fixed;
  top: 50px;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%);
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  display: flex;
  justify-content: space-around;
  background-color: var(--dark);
  color: white;
  .log {
    display: flex;
    flex-direction: column;
    align-items: center;
    .label {
      font-weight: 400;
      font-size: 14px;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      opacity: 0.5;
    }
    .output {
      font-size: 28px;
      font-weight: 800;
    }
  }
`

export default DevLogs
