import styled, { css } from 'styled-components'

export const Text = styled.span`
${props => props.black && css`
position: absolute;
  width: 74px;
  height: 16px;
  left: 30px;
  top: 323px;

  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;

  color: #000000;
  `}

${props => props.pink && css`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
    margin-left: 3px;
  color: #e20880;
  `}

  ${props => props.purple && css`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  color: #674c9f;
  `}

  ${props => props.blue && css`
  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;

  color: #35c5f3;
  `}

  ${props => props.bold && css`
font-family: Roboto;
font-style: normal;
font-weight: bold;
font-size: 12px;
line-height: 14px;

color: #000000;
  `}

  ${props => props.pinkSmall && css`
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 14px;
margin-left: 3px;
color: #e20880;
  `} 

  ${props => props.switch && css`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: white;
  `}
`