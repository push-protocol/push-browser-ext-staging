import React from "react";
import { Item, Section } from "../utils/SharedStyling";
import { FiSearch } from "react-icons/fi";
import styled from "styled-components";
import { goTo } from "react-chrome-extension-router";
import ChatBox from "./ChatBox";

const Chats = () => {
  return (
    <Section>
      <Item minWidth="300px" margin="0px auto">
        <SearchBox>
          <Inputbar placeholder="Search name.eth or 0x123.." />
          <SearchIcon>
            <FiSearch size={18} style={{ color: "#657795" }} />
          </SearchIcon>
        </SearchBox>

        <ChatContainer onClick={() => goTo(ChatBox)}>
          <Blocky></Blocky>
          <Details>
            <b>Adam.eth</b>
            <span>Hey are you there?</span>
          </Details>

          <Time>
            <span>9:30</span>
            <span></span>
          </Time>
        </ChatContainer>

        <ChatContainer>
          <Blocky></Blocky>
          <Details>
            <b>Adam.eth</b>
            <span>Hey are you there?</span>
          </Details>

          <Time>
            <span>9:30</span>
            <div>1</div>
          </Time>
        </ChatContainer>
      </Item>
    </Section>
  );
};

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #f4f5fa;
  width: 300px;
  height: 45px;
  border-radius: 99px;
  padding: 0px 10px;
  margin-top: 20px;
  margin-bottom: 15px;
  &:focus-within {
    outline: none;
    background-image: linear-gradient(#f4f5fa, #f4f5fa),
      linear-gradient(to right, #cf1c84, #8ed6ff);
    background-origin: border;
    border: 1px solid transparent !important;
    background-clip: padding-box, border-box;
  }
`;

const SearchIcon = styled.div`
  display: flex;
`;

const Inputbar = styled.input`
  flex: 1;
  border: none;
  height: 45px;
  background-color: transparent;
  font-family: strawford;
  outline: none;
  &::placeholder {
    letter-spacing: -0.019em;
    font-family: strawford;
  }
`;

const ChatContainer = styled.div`
  width: 320px;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 50px;
  padding: 10px 5px;
  border-radius: 10px;
  &:hover {
    background: #f4f5fa;
  }
`;

const Blocky = styled.div`
  width: 48px;
  height: 48px;
  background: rgb(34, 193, 195);
  background: linear-gradient(
    0deg,
    rgba(34, 193, 195, 1) 0%,
    rgba(253, 187, 45, 1) 100%
  );
  border-radius: 99px;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  b {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    letter-spacing: -0.019em;
    color: #1e1e1e;
  }
  span {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #657795;
  }
`;
const Time = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  justify-content: space-between;
  span {
    font-family: "Strawford";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 150%;
    color: #657795;
    align-self: flex-start;
  }
  div {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 130%;
    color: #fff;
    background: #cf1c84;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    width: 20px;
    align-self: flex-end;
  }
`;

export default Chats;
