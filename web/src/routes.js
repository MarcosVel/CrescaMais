import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Cursos from './Cursos';
import NewAndEditCurso from './EditCurso';
import Users from './Users';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/cursos" component={ Cursos } />
        <Route path='/curs/:id?' component={ NewAndEditCurso } />
        <Route path='/users' component={Users} />
      </Switch>
    </BrowserRouter>
  )
}