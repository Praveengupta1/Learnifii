import React from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Button from "../Button/index";
import Spinner from "../Spinner";
import { withRouter } from "react-router-dom";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      password: ""
    };
  }

  handleInputChange = (event) => {
    const { target } = event;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { onSignup, onHide } = this.props;
    const signUpRequest = Object.assign({}, this.state);

    if (this.props.location.search) {
      signUpRequest["referrer_id"] = this.props.location.search.split("=")[1];
      onSignup(signUpRequest).then(() => {
        this.props.history.push("/activities");
        onHide();
      });

      return;
    }

    onSignup(signUpRequest).then(() => {
      onHide();
    });

    // onSignup(signUpRequest).then(() => {
    //   onHide();
    // });
  };

  render() {
    const { isFetching } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            name="name"
            placeholder="Name"
            value={this.state.name}
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={this.state.phone}
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleInputChange}
            required
          />
        </Form.Group>
        <Button type="submit" variant="warning" block disabled={isFetching}>
          {!isFetching ? (
            "Sign Up"
          ) : (
            <Spinner theme="dark" text="Please wait..." />
          )}
        </Button>
      </Form>
    );
  }
}
SignupForm.propTypes = {
  onSignup: PropTypes.func,
  onHide: PropTypes.func,
  isFetching: PropTypes.bool
};

export default withRouter(SignupForm);
