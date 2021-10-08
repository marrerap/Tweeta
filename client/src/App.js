import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { actionLoggedOIn } from "./redux/actions/user";

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    fetch('/api/v1/users/current')
    .then(res => res.json())
    .then(data => {
      dispatch(actionLoggedOIn(data))
    })

  },[])


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
