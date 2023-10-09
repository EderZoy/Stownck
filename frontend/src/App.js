// App.js
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Principal from "./pages/Principal";
import ConsultarTipoProducto from "./pages/TipoProducto/ConsultarTipoProductos";
import RegistrarTipoProducto from "./pages/TipoProducto/RegistrarTipoProducto";
import EditarTipoProducto from "./pages/TipoProducto/EditarTipoProducto";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthProvider";
// import PrivateRoute from "./service/PrivateRoute";

const App = () => {
  const location = useLocation();
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/logout";

  return (
    <AuthProvider>
      <div>
        {!isLoginPage && <NavBar />}
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="logout" element={<Logout />} />
          <Route path="principal" element={<Principal />} />
          <Route
            path="consultar-tiposproductos"
            element={<ConsultarTipoProducto />}
          />
          <Route
            path="registrar-tipoproducto"
            element={<RegistrarTipoProducto />}
          />
          <Route
            path="editar-tipoproducto/:id"
            element={<EditarTipoProducto />}
          />
          {/* Otras rutas */}
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
