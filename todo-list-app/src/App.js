import { Login } from './pages/login'
import { Register } from './pages/register';
import { Main } from './pages/main';
import { RequireAuth } from './features/users/auth/require-auth.component';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './styles/App.css';
import { AuthProvider } from './features/users/auth/auth.context';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />            
            <Route path="/register" element={<Register />} />
            <Route element={<RequireAuth/>}>
              <Route path="/" element={<Main />}/>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
