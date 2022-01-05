import "./App.css";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import Login from "./components/Login";


import PrivateRoutes from "./components/Privateroutes";
import CompLayout from "./components/CompLayout";
import Comp from "./components/top";
import SignInSide from "./pages/Login";

function App() {
  return (
    <Router>
      {/* <Route exact path="/signup">
        <Register />
      </Route> */}
      <Route exact path="/signin">
        <SignInSide/>
      </Route>
      <Route exact path="/">
      <SignInSide/>
      </Route>
      
      <PrivateRoutes path="/Add_Roles" />
      <PrivateRoutes path="/Users" />
      <PrivateRoutes path="/property_type" />
      {/* <Route exact path="/" component={CompLayout}></Route> */}
      <Route exact path="/comp" component={Comp}></Route>
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
    </Router>
  );
}

export default App;
