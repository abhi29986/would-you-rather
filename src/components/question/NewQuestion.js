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
  //defining the initial state for 2 options for a question, Initial local state is empty
  state = {
    optionOne: "",
    optionTwo: ""
  };

//Refactoring: onchange function to set local state depends on option
  onOptionChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

//onsubmit function for adding new question
  onSubmit = e => {
    e.preventDefault();
    const { optionOne, optionTwo } = this.state;
    //not able to destructure please suggest.
    const { history,addNewQuestion } = this.props;
    addNewQuestion(optionOne, optionTwo);
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
                    name="optionOne"
                    onChange={this.onOptionChange}
                  />
                </InputGroup>
                <br />
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    Option 2:
                  </InputGroupAddon>
                  <Input
                    placeholder="Add Option One"
                    name="optionTwo"
                    onChange={this.onOptionChange}
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

// dispatching action as props for add a new question
function mapDispatchToProps(dispatch) {
  return {
    addNewQuestion: (optionOne, optionTwo) => {
      dispatch(handleAddQuestion(optionOne, optionTwo));
    }
  };
}

NewQuestion.propTypes = {
  addNewQuestion: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};
export default connect(null, mapDispatchToProps)(NewQuestion);
