import React from 'react'
import { Item, Section } from '../utils/SharedStyling'
import { FiSearch } from 'react-icons/fi'
import styled from 'styled-components';


const Chats = () => {
  return (
    <Section>
        <SearchBox>
            <Inputbar placeholder='Search name.eth or 0x123..' />
            <SearchIcon>
                 <FiSearch size={18} style={{ color: '#657795' }} />
            </SearchIcon>
        </SearchBox>
    </Section>
  )
}

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  background-color: #F4F5FA;
  width: 85%;
  height:48px;
  border-radius:99px;
  margin: 0 auto;
  padding: 0px 15px;
  margin-top: 20px;
`;

const SearchIcon = styled.div`
display:flex;
`

const Inputbar = styled.input`
flex:1;
width: 100%;
border:none;
height:48px;
background-color:transparent;
font-family: strawford;
outline:none;
&::placeholder {
    letter-spacing: -0.019em;
    font-family: strawford;
  }
`



export default Chats