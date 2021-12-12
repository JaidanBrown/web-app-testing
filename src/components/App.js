import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Signup from "../components/Signup"
import Dashboard from "./Dashboard";
import Login from "../components/Login"
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import PrivateRoute from "../components/PrivateRoute"

function App() {
  return (
    <div className="App">
      <Sidebar/>
      <div className="page-content">
        <Header/>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path="/" element={<PrivateRoute/>}>
                <Route exact path='/' element={<Dashboard/>}/>
              </Route>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </div>
  );
}

export default App;
