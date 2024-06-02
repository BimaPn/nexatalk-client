import styled, { keyframes } from 'styled-components'

const expandWidth = keyframes`
  from {
    width: 0%;
  }

  to {
    width: 100%;
  }
`;

const ProgressBar = styled.div<{duration:number, ispaused:string}>`
height: 100%; 
animation: ${expandWidth} ${props => `${props.duration}s`} linear;
animation-play-state: ${props => props.ispaused === "true" ? "paused":"running"};
`;

export default ProgressBar;
