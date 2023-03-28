import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

// components
import Layout from "./Layout";

// pages
import Error from "../pages/error";
import Login from "../pages/login";
import forgot from "../pages/forgot password/forgot";
// import changePassword from "../pages/changePassword";
import resetpassword from "../pages/ResetPassword/resetpassword";
import ConfirmPassword from "../pages/Confirm Password/ConfirmPassword";
// context
import { useUserState } from "../context/UserContext";

export default function App() {
  // global
  var { isAuthenticated } = useUserState();

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard" />} />
        <Route
          exact
          path="/app"
          render={() => <Redirect to="/app/dashboard" />}
        />
        <PrivateRoute path="/app" component={Layout} />
        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/forgot" component={forgot} />
        <PublicRoute path="/resetpassword" component={resetpassword} />
        <PublicRoute path="/ConfirmPassword" component={ConfirmPassword} />
        {/* <PublicRoute path="/changePassword" component={changePassword} /> */}
        <Route component={Error} />
      </Switch>
    </HashRouter>
  );

  // #######################################################################

  function PrivateRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            React.createElement(component, props)
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          )
        }
      />
    );
  }

  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/forgot",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
  function PublicRoute({ component, ...rest }) {
    return (
      <Route
        {...rest}
        render={props =>
          isAuthenticated ? (
            <Redirect
              to={{
                pathname: "/ConfirmPassword",
              }}
            />
          ) : (
            React.createElement(component, props)
          )
        }
      />
    );
  }
}
