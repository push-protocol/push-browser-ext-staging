import styled from 'styled-components'

export const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-evenly;
`
export const Wallet = styled.div`
 display: flex;
width: 146px;
height: 30px;
left: 20px;
margin-left: -20px;
top: 20px;
background: linear-gradient(90deg, #E20880 0%, #674C9F 52.75%, #35C5F3 100%);
border-radius: 20px;
justify-content: center;
align-items: center;
color: #ffffff;
font-family: "Roboto";
font-size: 14px;
`

export const FeedBox=styled.div`
  margin-left:7%;
  margin-right:7%
`

export const FeedHeader=styled.div`
width: 300px;
height: 40px;
display: flex;
flex-direction: row;
align-items: center;
background: #FFFFFF;
/* border: 1px solid black; */
border-bottom-width: 1px;
border-radius: 4px;
background-color: whitesmoke;
`

export const Bottom = styled.div`
display: flex;
justify-content: flex-end;
`

export const Line = styled.div`
width: 300px;
    margin-left: 1px;
height: 0px;
border: 0.5px solid rgba(0, 0, 0, 0.2);
`

export const FeedBody=styled.div`
margin-top: 10px;

`

export const NotificationTitle=styled.div`
    /* display: flex; */
    justify-content: center;
    align-items: center;
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 14px;
    margin-left: 0px;
    padding-left: 10px;
    /* identical to box height */
    justify-self: center;
    color: rgba(0, 0, 0, 0.5);;
`

export const NotificationBody = styled.div`
      margin-top: 10px;
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: black;
    padding-left: 10px;
    text-align: left;
    word-wrap: break-word;
    
`

export const FeedItem=styled.div`
width: 300px;
min-height: 190px;
max-height: 300px;

background: #FFFFFF;
box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
border-radius: 4px;
border-width: 2.5px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.2);
margin: 20px 0px 20px 0px;
overflow-y: auto;
`
export const ChannelIconStyle=styled.div`
width: 40px;
height: 40px;
`
export const ChannelHeader=styled.div`
    font-family: "Roboto";
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 14px;
    /* identical to box height */
    color: rgba(0, 0, 0, 0.5);
    margin-left: 30px;
    width: 70%;
    
`

export const TimeStamp = styled.p`
      margin: 27% 0% 0% 43%;
    font-size: 12px;
    padding-bottom: 0px;
    border-color: rgba(0, 0, 0, 0.2);
    border-style: solid;
    border-radius: 2px 2px 0px 0px;
    border-width: 2px 2px 0px;
    padding-left: 4px;
    color: rgba(0, 0, 0, 0.5);
    background-color: whitesmoke;
    width: 157px;
`

export const Profile= styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
`

export const Popup = styled.div`
  width: 260px;
  height: 200px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
  box-sizing:border-box;
  top: 123px;
  left: 50px;
  background: #f5f5f5;
  /* border:1px solid gray; */
  box-shadow: 3px 2px 5px;
  border-radius: 10px;
  z-index: 1;
`

export const Cross= styled.div`
  cursor: pointer;
  margin-left: 230px;
  height: 20px;
  width: 20px;
  color: white;
  background-color: #674c9f;
  border-radius: 50%;
  display: block;`

export const X= styled.span`
  padding-left: 6px;
  font-weight: bolder;
  padding-top: 3px;
  padding-top: 3px;
  display: block;
`

export const Button = styled.button`

  left: 28px;
  padding: 1rem;
  top: 83px;
  background: #674c9f;
  border-radius: 18px;
  border: none;
`