import React from "react";
import { Item, Section } from "../utils/SharedStyling";
import styled from "styled-components";

const Requests = () => {
  return (
    <Section>
      <Item minWidth="300px" margin="15px auto">
        <ChatContainer>
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
      </Item>
    </Section>
  );
};

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

export default Requests;
