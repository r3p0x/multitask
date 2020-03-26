import React from 'react'
import styled from 'styled-components'

const DevLogs = ({gameTime}) => {
  return (
    <StyledDevLogs>
      <div className='log'>
        <span className='label'>Game Time</span>
        <span className='output'>{gameTime || 0}</span>
      </div>
    </StyledDevLogs>
  )
}

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

export default DevLogs
