import './chat.css'
import send from '../../images/send.png'
import { SendRounded } from '@material-ui/icons'

function Chat() {
    return (
        <div className='chat-container'>
            <div className="chat-form-container">
                <form className="chat-form">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        autoComplete="off"
                    />
                    <SendRounded className="chat-btn-send"/>
                </form>
            </div>
            <div className="chat-groups">
                <h2>Chat groups</h2>    
            </div>
        </div>
    )
}

export default Chat