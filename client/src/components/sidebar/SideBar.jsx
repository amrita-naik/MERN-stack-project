import { AssignmentOutlined, ChatOutlined, GroupOutlined, HomeOutlined, LinearScaleOutlined, NoteAddOutlined } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import './sidebar.css'

function NavBar() {
    return (
        <div className='sidebar'>
            <LinearScaleOutlined className='icon menu'/>
            <Link to='/'>    
                <HomeOutlined className='icon'/>
            </Link>
            <Link to='/people'>    
                <GroupOutlined className='icon'/>
            </Link>
            <Link to='/tasks'>    
                <AssignmentOutlined className='icon'/>
            </Link>
            <Link to='/notes'>    
                <NoteAddOutlined className='icon'/>
            </Link>
            <Link to='/chat'>    
                <ChatOutlined className='icon'/>
            </Link>
            
        </div>
    )
}

export default NavBar
