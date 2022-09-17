import { Login } from './pages/login'
import { Register } from './pages/register';
import { ProjectList } from './pages/project-list';
import { RequireAuth } from './features/users/require-auth.component';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />            
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<RequireAuth><ProjectList /></RequireAuth>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
