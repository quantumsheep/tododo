import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Index from "./views/Index"
import Lists from "./components/Lists"
import TodoList from "./components/TodoList"

export default () => (
  <Router>
    <Switch>
      <Route path="/" exact>
        <Lists />
      </Route>
      <Route path="/:id">
        <TodoList/>
      </Route>
    </Switch>
  </Router >
)
