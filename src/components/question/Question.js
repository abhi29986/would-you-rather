import React from "react";
import { connect } from "react-redux";
import { Card, CardHeader, CardBody, CardTitle } from "reactstrap";
import { withRouter } from "react-router-dom";
import capitalizeFirstLetter from "../../validation/captitalizeFirstLetter";
import PropTypes from "prop-types";

const Question = props => {
  //get the details for a particular question based question id & on click event
  const onQuestionDetails = (event, id) => {
    event.preventDefault();
    props.history.push(`/questions/${id}`);
  };

  const { question } = props;

  const noOfVotesOpt1 = question.optionOne.votes.length;
  const noOfVotesOpt2 = question.optionTwo.votes.length;
  const totalVote = noOfVotesOpt1 + noOfVotesOpt2;

  // capitalize first letter of Author name.
  const capitalizeAuthor = capitalizeFirstLetter(question.author);
  return (
    <Card
      body
      inverse
      style={{ backgroundColor: "#393c42", borderColor: "#333" }}
      onClick={event => onQuestionDetails(event, question.id)}
    >
      <CardHeader>
        <strong>Question asked by: </strong>
        {capitalizeAuthor}
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
