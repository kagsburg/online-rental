import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Roles from '../pages/Roles';
import Propertytypes from '../pages/Property_type'
import Users from '../pages/Users'
import Comp from './comp'
import LayoutComp from "./LayoutComp";
export default function layout() {
  return (
    <div>
      <Routes>
        <Route  path='/dashboard/' element={<LayoutComp/>}>
          <Route path="Add_Roles" element={<Roles/>} />
          <Route path="property_type" element={<Propertytypes/>} />
          <Route path="Users" element={<Users/>} />
        </Route>
          
      </Routes>
    </div>
  );
}
