import React from "react";
import { Router, Route, Switch, Redirect, HashRouter } from "react-router-dom";
import { connect } from "react-redux";
import { history } from "../history/history";
import { alertActions } from "../actions";
import { PrivateRoute } from "../components/PrivateRoute";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { VapPage } from "../pages/VapPage";

/**
 * Main App
 */
class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen(() => {
      // clear alert on location change
      const { clearAlertMsg } = this.props;
      clearAlertMsg();
    });
  }

  render() {
    const { alert } = this.props;
    return (
      <div>
        {alert.message && (
          <div className={`alert ${alert.type}`}>
            <strong>
              <center>{alert.message}</center>
            </strong>
          </div>
        )}
        <Router history={history}>
          <Switch>
            <Route exact path="/" component={VapPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Redirect from="*" to="/" />
          </Switch>
        </Router>
      </div>
    );
  }
}

const actionCreators = {
  clearAlertMsg: alertActions.clear,
};

const mapStateToProps = (state) => {
  const { alert } = state;
  return { alert };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // fetchData: (url) => dispatch(myFetchData(url))
  };
};

const connectedApp = connect(mapStateToProps, actionCreators)(App);
export { connectedApp as App };
