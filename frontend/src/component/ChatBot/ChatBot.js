import React from "react";
import ChatBot from "react-simple-chatbot";
import { ThemeProvider } from "styled-components";
import "./ChatBot.css"
const theme = {
  background: "#f5f8fb",
  fontFamily: "Helvetica Neue",
  headerBgColor: "#4267b3",
  headerFontColor: "#fff",
  headerFontSize: "15px",
  botBubbleColor: "#4267b3",
  botFontColor: "#fff",
  userBubbleColor: "#fff",
  userFontColor: "#4a4a4a",
  zIndex:"2147483!important",

};

const ChatBotCom = () => {
  const steps=[
    {
      id: '1',
      message: 'What is your name?',
      trigger: '2',
    },
    {
      id: '2',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      message: 'Hi {previousValue}, nice to meet you!',
      end: true,
    },
  ]
  return (
      <div className="chatbot">
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} />
    </ThemeProvider>
    </div>
  );
};

export default ChatBotCom;
