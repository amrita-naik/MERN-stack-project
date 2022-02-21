import './chat.css'
function Chat() {
    return (
        <div className='chat-container'>
            <div className="chat-messages"></div>
            <div className="chat-form-container">
                <form className="chat-form">
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        autoComplete="off"
                    />
                    <button className="chat-btn-send">Send</button>
                </form>
            </div>
        </div>
    )
}

export default Chat