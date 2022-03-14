import './chat.css'
import { SendRounded } from '@material-ui/icons'
import { useEffect, useState } from 'react'

function Chat({socket}) {

    const [currentMsg, setCurrentMsg] = useState("");
    const [msgList, setMsgList] = useState([]);

    const sendMsg = async () => {
        if(currentMsg !== ""){
            const msgData = {
                message: currentMsg,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            }

        await socket.emit('send_msg', msgData);
        setMsgList((list) => [...list, msgData])
        }
    }

    useEffect(() => {
        socket.on('receive_msg', (data) => {
            setMsgList((list) => [...list, data])
        })
    }, [socket])

    return (
        <div className='chat-container'>
            <div className="chat-form-container">
                <form className="chat-form">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        autoComplete="off"
                        onChange={(event) => {
                            setCurrentMsg(event.target.value)
                        }}
                    />
                    <button onClick={(e) => {sendMsg(); e.preventDefault()}} className="chat-btn-send">
                        <SendRounded className="chat-icon-send"/>
                    </button>
                </form>
            </div>
            <div className="chat-msgs">
                {msgList.map((msgContent) => {
                    return (
                        <div>
                            <h2>{msgContent.message}</h2>
                            <p>{msgContent.time}</p>
                        </div>)
                })}
            </div>
            <div className="chat-groups">
                <h2>Chat groups</h2>    
            </div>
        </div>
    )
}

export default Chat