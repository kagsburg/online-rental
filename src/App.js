import "./App.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  Routes,
} from "react-router-dom";

import Roles from './pages/Roles';
import Propertytypes from './pages/Property_type';
import Users from './pages/Users';
import PrivateRoutes from "./components/Privateroutes";
import SignInSide from "./pages/Login";
import LayoutComp from "./components/LayoutComp";
import PropertyStatus from "./pages/PropertyStatus";
import Property from "./pages/Property";
import { AuthProvider } from './context/Auth';
import Lease from "./pages/Leases";
import PropertyUnits from "./pages/PropertyUnits";
function App() {
  return (
    <>
    
    <AuthProvider>
      <Routes>
      <Route exact path="/signin" element={<SignInSide/>}/>
      <Route exact path="/" element={<SignInSide/>}/>
      <Route  element={<PrivateRoutes />}>
        <Route element={<LayoutComp/>}>

      <Route path="dashboard/Add_Roles" element={<Roles/>} />
      <Route path="dashboard/property_type" element={<Propertytypes/>} />
      <Route path="dashboard/property_units" element={<PropertyUnits/>} />
      <Route path="dashboard/property_status" element={<PropertyStatus/>} />
      <Route path="dashboard/property" element={<Property/>} />
      <Route path="dashboard/Users" element={<Users/>} />
      <Route path="dashboard/Lease" element={<Lease />} />
        </Route>
      </Route>
    </Routes>
      {/* <Route  path="/login" >
        <Login/>
      </Route>
      <Route path="/register">
      {localStorage.getItem('token')? <Redirect to="/admin/dashboard"/>:<Register/>}
      </Route>

      <PrivateRoutes path="/admin/dashboard"/>
      
      <PrivateRoutes path="/property_type"/> */}
      
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      </AuthProvider>
    </>
  );
}

export default App;
