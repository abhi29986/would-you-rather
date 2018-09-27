import React from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

const Question = props => {
  const onQuestionDetails = (event, id) => {
    event.preventDefault();
    props.history.push(`/questions/${id}`);
  };
  /*  function capitalizeFistLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }*/
  const { question } = props;

  const noOfVotesOpt1 = question.optionOne.votes.length;
  const noOfVotesOpt2 = question.optionTwo.votes.length;
  const totalVote = noOfVotesOpt1 + noOfVotesOpt2;

  //const capitalizeAuthor = capitalizeFistLetter(question.author);
  return (
    <Card
      body
      inverse
      style={{ backgroundColor: "#393c42", borderColor: "#333" }}
      onClick={event => onQuestionDetails(event, question.id)}
    >
      <CardHeader>
        <strong>Question asked by: </strong>
        {question.author}
      </CardHeader>
      <CardBody>
        <CardTitle>Would You Rather?</CardTitle>
        <ul>
          <li>
            {question.optionOne.text} ({noOfVotesOpt1} vote | {" "}
            {totalVote > 0 ? (noOfVotesOpt1 / totalVote).toFixed(2) * 100 : 0}%)
          </li>
          <li>
            {question.optionTwo.text} ({noOfVotesOpt2} vote | {" "}
            {totalVote > 0 ? (noOfVotesOpt2 / totalVote).toFixed(2) * 100 : 0}%)
          </li>
        </ul>
      </CardBody>
    </Card>
  );
};

function mapStateToProps({ questions }, { id }) {
  return {
    question: questions[id]
  };
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(withRouter(Question));
