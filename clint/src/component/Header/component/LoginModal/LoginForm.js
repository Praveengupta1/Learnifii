import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import Button from "../Button/index";
import Spinner from "../Spinner";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const { target } = event;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { onLogin, onHide } = this.props;
    const loginRequest = Object.assign({}, this.state);
    onLogin(loginRequest).then(() => {
      onHide();
    });
  }

  render() {
    const { isFetching } = this.props;
    const { email, password } = this.state;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={this.handleInputChange}
            required
          />
          <strong>
            <p style={{ textAlign: "right" }}>
              <Link to={{ pathname: `/forgotpassword` }}>Forgot Password</Link>
            </p>
          </strong>
        </Form.Group>
        <Button type="submit" variant="warning" block disabled={isFetching}>
          {!isFetching ? (
            "Login"
          ) : (
            <Spinner theme="dark" text="Please wait..." />
          )}
        </Button>
      </Form>
    );
  }
}
LoginForm.propTypes = {
  onLogin: PropTypes.func,
  onHide: PropTypes.func,
  isFetching: PropTypes.bool
};

export default LoginForm;
