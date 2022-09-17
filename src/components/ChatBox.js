import React from "react";
import styled from "styled-components";
import { Item } from "../utils/SharedStyling";
import Topbar from "./Topbar";
import { BsArrowLeft } from "react-icons/bs";
import { AiOutlineEllipsis } from "react-icons/ai";
import { goTo } from "react-chrome-extension-router";
import ChatPage from "../pages/ChatPage/ChatPage";
import { BsEmojiSmile, BsPaperclip } from "react-icons/bs";
import Send from "../assests/sendNotifOnIcon.svg";

const ChatBox = () => {
  return (
    <div className="standard-page">
      <Topbar />

      <Chatbox>
        <TopSpace>
          <BsArrowLeft
            size={22}
            color={"#657795"}
            onClick={() => goTo(ChatPage)}
          />

          <TopNav>
            <ImageBottom>
              <Blocky></Blocky>
            </ImageBottom>
            <Addressbar>0xF2B2...2Ec34E</Addressbar>

            <BottomIcon>
              <AiOutlineEllipsis size={25} />
            </BottomIcon>
          </TopNav>
        </TopSpace>

        <DateStamp>Today</DateStamp>

        <MessageWrapper align="row">
          <ReceivedMessage>
            <TextMessage>Hi</TextMessage>
            <TimeStamp>2:30</TimeStamp>
          </ReceivedMessage>
        </MessageWrapper>

        <MessageWrapper align="row-reverse">
          <SenderMessage>
            <TextMessage>Hello</TextMessage>
            <TimeStamp>2:30</TimeStamp>
          </SenderMessage>
        </MessageWrapper>

        <TextBox>
          <BsEmojiSmile size={24} color="#494D5F" />
          <InputBox placeholder="Type your message..." />
          <Rotate>
            <BsPaperclip size={24} color="" />
          </Rotate>
          <Image src={Send} alt="" />
        </TextBox>
      </Chatbox>
    </div>
  );
};

const Chatbox = styled.div`
  flex: 1;
  background: linear-gradient(179.97deg, #eef5ff 0.02%, #ece9fa 123.25%);
  flex-grow: 1;
`;

const Rotate = styled.div`
  transform: rotate(45deg);
  margin-right: 10px;
  margin-top: 4px;
`;

const TextBox = styled.div`
  position: absolute;
  top: 530px;
  left: 15px;
  background: #fff;
  height: 55px;
  width: 310px;
  border-radius: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 10px;
`;

const InputBox = styled.input`
  flex: 1;
  height: 54px;
  background: transparent;
  border: none;
  margin-left: 10px;
  outline: none;
`;

const Image = styled.img`
  width: 24px;
`;

const TopSpace = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex: 1;
  padding: 15px;
`;

const TopNav = styled.div`
  width: 300px;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  padding: 0 5px 0 2px;
  border-radius: 29px;
  margin-left: 10px;
`;

const Addressbar = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 150%;
  letter-spacing: -0.019em;
  color: #1e1e1e;
  margin-left: 10px;
`;

const ImageBottom = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 100%;
  overflow: hidden;
  transform: scale(0.85);
  outline-color: rgba(225, 225, 225, 0.2);
`;

const BottomIcon = styled.div`
  margin-left: auto;
  transform: rotate(90deg);
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

const MessageWrapper = styled.div`
  width: 100%;
  min-height: ${(props: any): string => props.height || "48px"};
  padding: 0;
  margin-bottom: 5px;
  display: flex;
  flex-direction: ${(props: any): string => props.align || "row"};
`;

const SenderMessage = styled.div`
  box-sizing: border-box;
  position: relative;
  right: 20px;
  max-width: 219px;
  text-align: left;
  padding: ${(props: any): string => props.padding || "11px 11px 5px 24px"};
  background: ${(props: any): string => props.color || "#ca599b"};
  border-radius: 16px 2px 16px 16px;
  display: flex;
  justify-content: flex-strt;
  align-items: center;
  color: #ffffff;
`;

const TextMessage = styled.p`
  max-width: 300px;
  padding: 0px 44px 10px 0px;
  font-size: 14px;
  word-wrap: break-word;
  text-align: left;
  margin: 0px;
`;

const TimeStamp = styled.span`
  min-width: 44px;
  font-size: 13px;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  padding: 5px 0px 0px 5px;
  position: absolute;
  right: 10px;
  bottom: 5px;
`;

const ReceivedMessage = styled.div`
  box-sizing: border-box;
  position: relative;
  left: 20px;
  max-width: 219px;
  padding: ${(props: any): string => props.padding || "11px 11px 5px 24px"};
  background: ${(props: any): string => props.color || "#ffffff"};
  text-align: left;
  border-radius: 2px 16px 16px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #000000;
  font-weight: 400;
  font-size: 15px;
  line-height: 130%;
`;

const DateStamp = styled.div`
  display: flex;
  justify-content: center;
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 150%;
  text-align: center;
  color: #6f829e;
`;

export default ChatBox;
