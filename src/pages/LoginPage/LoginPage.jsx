import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { userActions } from "../../actions";
import "./LoginPage.css";
import logo from "../../images/logo.png";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      submitted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { logout } = this.props;
    // reset login status
    logout();
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login } = this.props;
    const { username, password } = this.state;

    this.setState({ submitted: true });
    if (username && password) {
      login(username, password);
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { username, password, submitted } = this.state;

    return (
      <div className="full-screen">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="card shadow p-4 mb-4 bg-light" style={{ width: 450 }}>
            <div className="card-header text-center">
              <h6> Welcome to Contract Based Service Offerings </h6>
            </div>
            <div className="card-body">
              <div className="text-center">
                <img src={logo} style={{ width: 200 }} alt="dashreel" />
              </div>
              <h5 className="card-title"></h5>
              <br></br>

              <form name="form" onSubmit={this.handleSubmit}>
                <div
                  className={
                    "form-group" + (submitted && !username ? " has-error" : "")
                  }
                >
                  <label htmlFor="username" className="font-weight-bold">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={username}
                    onChange={this.handleChange}
                  />
                  {submitted && !username && (
                    <div className="text-danger">Username is required</div>
                  )}
                </div>
                <div
                  className={
                    "form-group" + (submitted && !password ? " has-error" : "")
                  }
                >
                  <label htmlFor="password" className="font-weight-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.handleChange}
                  />
                  {submitted && !password && (
                    <div className="text-danger">Password is required</div>
                  )}
                </div>
                <div className="form-group">
                  <button className="btn btn-primary">Login</button>
                  <Link to="/register" className="btn btn-link">
                    Register
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { loggingIn } = state.authentication;
  return { loggingIn };
}

const actionCreators = {
  login: userActions.login,
  logout: userActions.logout,
};

const connectedLoginPage = connect(mapState, actionCreators)(LoginPage);
export { connectedLoginPage as LoginPage };
