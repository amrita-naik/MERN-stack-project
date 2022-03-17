import './chat.css'
import { SendRounded } from '@material-ui/icons'
import { useEffect, useState } from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'

function Chat({socket, username, room}) {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currentMessage !== "") {
          const messageData = {
            room: room,
            author: username,
            message: currentMessage,
            time:
              new Date(Date.now()).getHours() +
              ":" +
              new Date(Date.now()).getMinutes(),
          };

          await socket.emit("send_message", messageData);
          setMessageList((list) => [...list, messageData]);
          setCurrentMessage("");
        }
      };
    
      useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessageList((list) => [...list, data]);
        });
      }, [socket]);


    return (
        <div className='chat-container'>
            
            <div className="chat-window">
                <div className="chat-body">
                    <ScrollToBottom className="message-container">
                        {messageList.map((messageContent) => {
                            return (
                                <div className="message" id={username === messageContent.author ? "you" : "other"}>
                                    <div className="message-content">
                                        <p id="author">{messageContent.author}</p>
                                        <p>{messageContent.message}</p>
                                        <div className='message-time'><p id="time">{messageContent.time}</p></div>
                                    </div>
                                    
                                </div>
                            );
                        })}
                    </ScrollToBottom>
                </div>

                <div className="chat-input">
                    <input
                    type="text"
                    value={currentMessage}
                    placeholder="Message"
                    onChange={(event) => {
                        setCurrentMessage(event.target.value);
                    }}
                    onKeyPress={(event) => {
                        event.key === "Enter" && sendMessage();
                    }}
                    />
                    <div onClick={sendMessage}><SendRounded  className='chat-send-btn' /></div>
                </div>
            </div>
        </div>
    )
}

export default Chat