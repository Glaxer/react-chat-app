import React from "react";
import {
  Chat,
  Channel,
  ChannelList,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread
} from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
const App = props => {
  const filters = { type: "messaging", members: { $in: [props.userId] } };
  return (
    <Chat client={props.chatClient} theme={"messaging dark"}>
      <ChannelList filters={filters} />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
        <Thread />
      </Channel>
    </Chat>
  );
};
export default App;