// App.js
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Principal from "./pages/Principal";
import NavBar from "./components/NavBar";

const App = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  return (
    <div>
      {!isLoginPage && <NavBar />}
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="principal" element={<Principal />} />
        {/* Otras rutas */}
      </Routes>
    </div>
  );
};

export default App;
