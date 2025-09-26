import './style/App.css'
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login.jsx';
import { MainLayout } from './components/MainLayout.jsx';
import {pageComponentMap} from "./pages/PageMap.jsx";

function App() {
    return (
        <div>
          <Routes>
            <Route path="/" element={<Navigate to="/login"/>}/>
            <Route path="/login" element={<Login/>}/>


            <Route element={<MainLayout/>}>
              {Object.entries(pageComponentMap).map(([path, element]) => (
                <Route key={path} path={`/page${path}`} element={element}/>
              ))}
            </Route>
          </Routes>

        </div>
    )
}

export default App
