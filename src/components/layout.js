import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Roles from '../pages/Roles';
import Propertytypes from '../pages/Property_type'
import Comp from './comp'

export default function layout() {
  return (
    <div>
      <Switch>
        <Comp>
          <Route path="/Add_Roles" component={Roles} />
          <Route path="/property_type" component={Propertytypes} />
        </Comp>
      </Switch>
    </div>
  );
}