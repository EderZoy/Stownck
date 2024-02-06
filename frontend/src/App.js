// App.js
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Principal from "./pages/Principal";
import ConsultarTipoProducto from "./pages/TipoProducto/ConsultarTipoProductos";
import RegistrarTipoProducto from "./pages/TipoProducto/RegistrarTipoProducto";
import EditarTipoProducto from "./pages/TipoProducto/EditarTipoProducto";
import ConsultarFormasPago from "./pages/FormaPago/ConsultarFormasPago";
import RegistrarFormaPago from "./pages/FormaPago/RegistrarFormaPago";
import EditarFormaPago from "./pages/FormaPago/EditarFormaPago";
import ConsultarProveedor from "./pages/Proveedor/ConsultarProveedores";
import RegistrarProveedor from "./pages/Proveedor/RegistrarProveedor";
import EditarProveedor from "./pages/Proveedor/EditarProveedor";
import ConsultarProducto from "./pages/Producto/ConsultarProductos";
import RegistrarProducto from "./pages/Producto/RegistrarProducto";
import EditarProducto from "./pages/Producto/EditarProducto";
import ConsultarCompras from "./pages/Compras/ConsultarCompras";
import RegistrarCompra from "./pages/Compras/RegistrarCompra";
import ConsultarVentas from "./pages/Ventas/ConsultarVentas";
import RegistrarVenta from "./pages/Ventas/RegistrarVenta";
import NavBar from "./components/NavBar";
import { AuthProvider } from "./context/AuthProvider";
import RegistrarCambioMasivo from "./pages/CambioMasivo/RegistrarCambioMasivo";
import Dashboard from "./pages/Informes/Dashboard";
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
          <Route
            path="consultar-formaspago"
            element={<ConsultarFormasPago />}
          />
          <Route path="registrar-formapago" element={<RegistrarFormaPago />} />
          <Route path="editar-formapago/:id" element={<EditarFormaPago />} />
          <Route
            path="consultar-proveedores"
            element={<ConsultarProveedor />}
          />
          <Route path="registrar-proveedor" element={<RegistrarProveedor />} />
          <Route path="editar-proveedor/:id" element={<EditarProveedor />} />
          <Route path="consultar-productos" element={<ConsultarProducto />} />
          <Route path="registrar-producto" element={<RegistrarProducto />} />
          <Route path="editar-producto/:id" element={<EditarProducto />} />
          <Route path="consultar-compras" element={<ConsultarCompras />} />
          <Route path="registrar-compra" element={<RegistrarCompra />} />
          <Route path="consultar-ventas" element={<ConsultarVentas />} />
          <Route path="registrar-venta" element={<RegistrarVenta />} />
          <Route path="registrar-cambio" element={<RegistrarCambioMasivo />} />
          <Route path="consultar-estadisticas" element={<Dashboard />} />
          {/* Otras rutas */}
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
