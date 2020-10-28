import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Cursos from './Cursos';
import NewCurso from './NewCurso';
import NewAndEditCurso from './EditCurso';
import Users from './Users';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/cursos" component={ Cursos } />
        <Route path="/curso/new" component={ NewCurso } />
        <Route path='/curs/:id' component={NewAndEditCurso} />
        <Route path='/users' component={Users} />
      </Switch>
    </BrowserRouter>
  )
}