import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './Login';
import Cursos from './Cursos';
import NewCurso from './NewCurso';
import EditCurso from './EditCurso';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ Login } />
        <Route path="/cursos" component={ Cursos } />
        <Route path="/curso/new" component={ NewCurso } />
        <Route path="/curso/edit" component={ EditCurso } />
      </Switch>
    </BrowserRouter>
  )
}