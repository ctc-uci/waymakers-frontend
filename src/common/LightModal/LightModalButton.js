import styled, { css } from 'styled-components';

const LightModalButton = styled.button`
    border-radius: 5px;
    border-style: solid;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-width: 0px;
    margin: 8px;
    padding: 8px;
    cursor: pointer;

  ${(props) => props.primary && css`
    background: #5D9A64;
    color: white;
  `}

  ${(props) => props.secondary && css`
    background: #003E53;
    color: white;
  `}

  ${(props) => props.danger && css`
    background: #C84D39;
    color: white;
  `}

  ${(props) => props.primaryOutline && css`
    background: none;
    color: #5D9A64;
    border-color: #5D9A64;
    border-width: 2px;
  `}

  ${(props) => props.secondaryOutline && css`
    background: none;
    color: #003E53;
    border-color: #003E53;
    border-width: 2px;
  `}

  ${(props) => props.dangerOutline && css`
    background: none;
    color: #C84D39;
    border-color: #C84D39;
    border-width: 2px;
  `}
`;

export default LightModalButton;
