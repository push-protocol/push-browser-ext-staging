import styled, { css } from 'styled-components'
import Wallet from "../assests/wallet\ 1.png"

export const WalletAddress = styled.div`
position: absolute;
  width: 169px;
  height: 28px;
  left: 96px;
  top: 200px;

  font-family: Roboto;
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 28px;

  color: #000000;
`

export const Description = styled.div`
 position: absolute;
width: 320px;
height: 28px;
left: 30px;
top: 258px;
font-family: Roboto;
font-style: normal;
font-weight: normal;
font-size: 12px;
line-height: 14px;

color: #000000;

`

export const Button = styled.button`

${props => props.verify && css`
position: absolute;
width: 140px;
height: 50px;
left: 30px;
top: 510px;

background: #E20880;
border-radius: 4px;
color:white
  `} 

  ${props => props.cancel && css`
  position: absolute;
width: 140px;
height: 50px;
left: 190px;
top: 510px;

border: 1px solid #E20880;
box-sizing: border-box;
border-radius: 4px;
color:#E20880;
background:white;
  `} 

`

