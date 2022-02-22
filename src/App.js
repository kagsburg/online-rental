import "./App.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  Route,
  Routes,
} from "react-router-dom";

import Login from "./components/Login";
import Roles from './pages/Roles';
import Propertytypes from './pages/Property_type'
import Users from './pages/Users'

import PrivateRoutes from "./components/Privateroutes";
import CompLayout from "./components/CompLayout";
import Comp from "./components/top";
import SignInSide from "./pages/Login";
import LayoutComp from "./components/LayoutComp";

function App() {
  return (
    <>
    
    
      <Routes>
      <Route exact path="/signin" element={<SignInSide/>}/>
      <Route exact path="/" element={<SignInSide/>}/>
      <Route  element={<PrivateRoutes />}>
        <Route element={<LayoutComp/>}>

      <Route path="dashboard/Add_Roles" element={<Roles/>} />
      <Route path="dashboard/property_type" element={<Propertytypes/>} />
      <Route path="dashboard/Users" element={<Users/>} />
        </Route>
      </Route>

      
      
      
      {/* <PrivateRoutes path="/Add_Roles" />
      <PrivateRoutes path="/Users" />
      <PrivateRoutes path="/property_type" /> */}
      {/* <Route exact path="/" component={CompLayout}></Route> */}
      <Route exact path="/comp" element={<Comp/>}></Route>
      </Routes>
    
      {/* <Route exact path="/dashboard" component={Layout}></Route> */}
      {/* <Route  path="/login" >
        <Login/>
      </Route>
      <Route path="/register">
      {localStorage.getItem('token')? <Redirect to="/admin/dashboard"/>:<Register/>}
      </Route>

      <PrivateRoutes path="/admin/dashboard"/>
      
      <PrivateRoutes path="/property_type"/> */}
      {/* <div className="wrapper">
      
        <Header/>
        <Sidebar/>
     
       <Switch>
           <Route exact path="/">
          <Dash/>
          </Route>
        
          <Route path="/Add_Landlord" component={Add_Landlord}></Route>
          <Route path="/All_landlord" component={All_landlord}></Route>
          <Route path="/Edit_Landlord/:id" component={Edit_landlord}></Route> 
          
        </Switch>
     
        
       
      </div> */}
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
    </>
  );
}

export default App;
