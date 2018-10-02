import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Form,
  FormGroup,
  Input,
  Row,
  Col
} from "reactstrap";
import { GoSignIn } from "react-icons/go";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import { loginUser } from "../../actions/authedUserAction";
import PropTypes from "prop-types";

class Login extends Component {
  //initializing auth state for a user, initially user id should be empty and authHome will be false
  state = {
    uid: "",
    authHome: false
  };

//on click function for user login
  onUserLogin = () => {
    //const { uid } = this.state;
    //const { loginUser } = this.props;
    const {state:{uid},props:{loginUser}}=this;
    if (uid) {
      loginUser(uid);
      this.setState(previousState => {
        return {
          ...previousState,
          authHome: true
        };
      });
    }
  };

// changing the local state of a user based on selected user
  onSelectUser = event => {
    //const uid = event.target.value;
    const {value:uid}=event.target;
    this.setState({ uid });
  };

  render() {
    const { users,history } = this.props;
    const { uid, authHome } = this.state;
    // If authenticated redirect to dashboard or history location
	if (authHome) {      
      const redirect = history.location.state;
      if (redirect != null) {
        return <Redirect to={redirect} push={true} />;
      }
      return <Redirect to="/" />;
    }
    return (
      <Row>
        <Col sm="16" md={{ size: 8, offset: 2 }}>
          <Card>
            <CardBody>
              <CardTitle>
                <GoSignIn /> LogIn Selector
              </CardTitle>
              <Form>
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    value={uid}
                    onChange={this.onSelectUser}
                  >
                    <option value="" disabled>
                      Please select
                    </option>
                    {Object.keys(users).map(user => (
                      <option key={user} value={user}>
                        {users[user].name}
                      </option>
                    ))}
                  </Input>
                </FormGroup>
                <Button
                  color="primary"
                  onClick={this.onUserLogin}
                  disabled={isEmpty(uid)}
                >
                  SignIn
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};
Login.propTypes = {
  users: PropTypes.object.isRequired,
  loginUser: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { loginUser })(withRouter(Login));
