import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Cursos from './Cursos';
import NewCurso from './NewCurso';
import NewAndEditCurso from './EditCurso';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/cursos" component={ Cursos } />
        <Route path="/curso/new" component={ NewCurso } />
        <Route path='/curs/:id' component={NewAndEditCurso} />
      </Switch>
    </BrowserRouter>
  )
}