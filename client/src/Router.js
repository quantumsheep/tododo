import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"

import Index from "./views/Index"

export default () => (
  <Router>
    <Switch>
      <Route path="/">
        <Index />
      </Route>
    </Switch>
  </Router >
)
