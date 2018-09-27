import React, { Component } from "react";
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
  state = {
    uid: ""
  };
  onUserLogin = () => {
    const { uid } = this.state;
    const { loginUser } = this.props;
    if (uid) {
      loginUser(uid);
    }
  };

  onSelectUser = event => {
    const uid = event.target.value;
    this.setState({ uid });
  };

  render() {
    const { users } = this.props;
    const { uid } = this.state;
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

export default connect(mapStateToProps, { loginUser })(Login);
