import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Principal from "./pages/Principal";

const App = () => {
  return (
    <div>
      <Routes initialRouteName="Login">
        <Route path="/"></Route>
        <Route path="login" element={<Login></Login>} />
        <Route path="principal" element={<Principal></Principal>} />

        {/* Otras rutas */}
      </Routes>
    </div>
  );
};

export default App;
