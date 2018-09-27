import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Input,
  Form,
  Button,
  Row,
  Col,
  InputGroup,
  InputGroupAddon
} from "reactstrap";
import { connect } from "react-redux";
import isEmpty from "../../validation/is-empty";
import { handleAddQuestion } from "../../actions/sharedAction";
import PropTypes from "prop-types";

class NewQuestion extends Component {
  state = {
    optionOne: "",
    optionTwo: ""
  };

  onOptionOneChange = e => {
    e.preventDefault();
    this.setState({
      optionOne: e.target.value
    });
  };

  onOptionTwoChange = e => {
    e.preventDefault();
    this.setState({
      optionTwo: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    this.props.addNewQuestion(optionOne, optionTwo);
    const { history } = this.props;
    history.push("/");
  };

  render() {
    const { optionOne, optionTwo } = this.state;

    return (
      <Row>
        <Col sm="12" md={{ size: 6, offset: 3 }}>
          <Card
            body
            inverse
            style={{ backgroundColor: "#393c42", borderColor: "#333" }}
          >
            <CardBody>
              <CardTitle>Would You Rather</CardTitle>
              <Form onSubmit={this.onSubmit}>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Option 1:
                  </InputGroupAddon>
                  <Input
                    placeholder="Add Option One"
                    value={optionOne}
                    onChange={this.onOptionOneChange}
                  />
                </InputGroup>
                <br />
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Option 2:
                  </InputGroupAddon>
                  <Input
                    placeholder="Add Option One"
                    value={optionTwo}
                    onChange={this.onOptionTwoChange}
                  />
                </InputGroup>
                <br />
                <Button
                  color="primary"
                  disabled={isEmpty(optionOne) || isEmpty(optionTwo)}
                >
                  Submit
                </Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    }
  };
}
//disabled={optionOne === "" || optionTwo === ""}

NewQuestion.propTypes = {
  addNewQuestion: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
export default connect(null, mapDispatchToProps)(NewQuestion);
