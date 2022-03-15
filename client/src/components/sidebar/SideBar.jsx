import { Assignment, Chat, Group, Home, LinearScaleOutlined, NoteAdd } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import './sidebar.css'

function NavBar() {
    return (
        <div className='sidebar'>
            <LinearScaleOutlined className='icon menu'/>
            <Link to='/'>    
                <Home className='icon'/>
            </Link>
            <Link to='/people'>    
                <Group className='icon'/>
            </Link>
            <Link to='/tasks'>    
                <Assignment className='icon'/>
            </Link>
            <Link to='/notes'>    
                <NoteAdd className='icon'/>
            </Link>
            <Link to='/chat'>    
                <Chat className='icon'/>
            </Link>
            
        </div>
    )
}

export default NavBar
