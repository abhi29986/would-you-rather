import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  FormGroup,
  Label,
  Input,
  Form,
  Button,
  Row,
  Col
} from "reactstrap";
import { handleSaveQuestionAnswer } from "../../actions/sharedAction";
import PropTypes from "prop-types";

class QuestionDetails extends Component {
  state = {
    selected: ""
  };

  onRadioSelect = e => {
    this.setState({
      selected: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.saveQuestionAnswer(this.state.selected);
  };

  render() {
    const { question, questionAuthor, authedUser } = this.props;
    //Check whether option 1 is answered by the logged in juser
    const isOptionOneAnswered = question.optionOne.votes.includes(authedUser);
    //Check whether option 2 is answered by the logged in juser
    const isOptionTwoAnswered = question.optionTwo.votes.includes(authedUser);
    const isAnswered = isOptionOneAnswered || isOptionTwoAnswered;

    if (!question) {
      return <Redirect to="/not-found" />;
    }

    const { selected } = this.state;

    const noOfVotesOpt1 = question.optionOne.votes.length;
    const noOfVotesOpt2 = question.optionTwo.votes.length;
    const totalVote = noOfVotesOpt1 + noOfVotesOpt2;
    const opt1Percentage = (noOfVotesOpt1 / totalVote).toFixed(2) * 100;
    const opt2Percentage = (noOfVotesOpt1 / totalVote).toFixed(2) * 100;

    return (
      <Row>
        <Col sm="10" md={{ size: 6, offset: 2 }}>
          <Card
            body
            inverse
            style={{ backgroundColor: "#393c42", borderColor: "#333" }}
          >
            <CardHeader>
              <strong>Question asked by: </strong>
              {questionAuthor.id}
            </CardHeader>
            <CardBody>
              <CardTitle>Would You Rather?</CardTitle>
              {isAnswered ? (
                <ul>
                  <li>
                    {question.optionOne.text} ({noOfVotesOpt1} vote | {" "}
                    {opt1Percentage}%)
                  </li>
                  <li>
                    {question.optionTwo.text} ({noOfVotesOpt2} vote | {" "}
                    {opt2Percentage}%)
                  </li>
                </ul>
              ) : (
                <Form onSubmit={this.onSubmit}>
                  <FormGroup tag="fieldset">
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          value="optionOne"
                          onChange={this.onRadioSelect}
                        />{" "}
                        {question.optionOne.text}
                      </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Label check>
                        <Input
                          type="radio"
                          name="radio1"
                          value="optionTwo"
                          onChange={this.onRadioSelect}
                        />{" "}
                        {question.optionTwo.text}
                      </Label>
                    </FormGroup>
                  </FormGroup>
                  <Button color="primary" disabled={selected === ""}>
                    Submit Poll
                  </Button>
                </Form>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }
}

function mapStateToProps({ questions, users, authedUser }, props) {
  const { id } = props.match.params;
  const question = questions[id];
  const questionAuthor = users[question.author];
  return {
    question,
    questionAuthor,
    authedUser
  };
}

function mapDispatchToProps(dispatch, props) {
  const { id } = props.match.params;
  return {
    saveQuestionAnswer: answer => {
      dispatch(handleSaveQuestionAnswer(id, answer));
    }
  };
}

QuestionDetails.propTypes = {
  question: PropTypes.object,
  questionAuthor: PropTypes.object,
  authedUser: PropTypes.string,
  saveQuestionAnswer: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionDetails);
