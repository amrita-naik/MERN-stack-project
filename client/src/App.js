import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import People from './pages/people/People';
import Notes from './pages/notes/Notes';
import Tasks from './pages/tasks/Tasks'
import Chat from './pages/chat/Chat';
import NavBar from './components/navbar/NavBar'
import SideBar from './components/sidebar/SideBar'

function App() {
  return (
    <div className="App">
      <Router >
        <NavBar />
        
        <div className="app-container">
          <SideBar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/people' element={<People />}/>
            <Route path='/notes' element={<Notes />}/>
            <Route path='/tasks' element={<Tasks />}/>
            <Route path='/chat' element={<Chat />}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
