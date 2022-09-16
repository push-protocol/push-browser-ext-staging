import React from 'react'
import { Item, Section } from '../utils/SharedStyling'
import { FiSearch } from 'react-icons/fi'
import styled from 'styled-components';


const Chats = () => {
  return (
    <Section>
        <Item minWidth='300px' margin='0px auto'>
        <SearchBox>
            <Inputbar placeholder='Search name.eth or 0x123..' />
            <SearchIcon>
                 <FiSearch size={18} style={{ color: '#657795' }} />
            </SearchIcon>
        </SearchBox>
        </Item>
    </Section>
  )
}

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items:center;
  background-color: #F4F5FA;
  width: 300px;
  height:45px;
  border-radius:99px;
  padding: 0px 10px;
  margin-top: 20px;
  &:focus-within {
    outline: none;
    background-image: linear-gradient(#f4f5fa, #f4f5fa), linear-gradient(to right, #cf1c84, #8ed6ff);
    background-origin: border;
    border: 1px solid transparent !important;
    background-clip: padding-box, border-box;
  }
`;

const SearchIcon = styled.div`
  display:flex;
`

const Inputbar = styled.input`
    flex:1;
    border:none;
    height:45px;
    background-color:transparent;
    font-family: strawford;
    outline:none;
    &::placeholder {
        letter-spacing: -0.019em;
        font-family: strawford;
    }
`



export default Chats