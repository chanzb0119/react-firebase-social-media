import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { Main } from './main/main';
import { Login } from './pages/login';
import { Nav } from './components/nav';
import { CreatePost } from './create-post/create-post';

function App() {
  return (
    <div className="App">
      <Router>
        <Nav/>
        <Routes>
          <Route path="/"  element={<Main/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/createpost" element={<CreatePost/>}/>
        </Routes>
      </Router>
        
    </div>
  );
}

export default App;
