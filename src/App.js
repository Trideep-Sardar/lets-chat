import './App.css';
import Home from './components/Home/Home';
import Chat from './components/Chat/Chat';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import HomeState from './context/HomeState';
function App() {
  return (
    <HomeState>
    <Router>
    <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/chat' element={ <Chat/>}/>
    </Routes>
    </Router>
    </HomeState>
  );
}

export default App;
