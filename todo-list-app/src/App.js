import {Login} from './pages/login'
import { Register } from './pages/register';
import { ProjectList } from './pages/project-list';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />            
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProjectList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
