import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//class based reusable user component to  display user image with name.
class User extends Component {
  render() {
    const { user } = this.props;

    return (
      <Fragment>
        <img
          src={user.avatarURL}
          className="rounded-circle"
          style={{ width: "50px", marginRight: "5px", marginTop: "5px" }}
          alt={`${user.name}`}
        />
        <span style={{ color: "white" }}>{user.name}</span>
      </Fragment>
    );
  }
}

function mapStateToProps({ users }, { id }) {
  return {
    user: users[id]
  };
}

User.propTypes = {
  user: PropTypes.object.isRequired
};

export default connect(mapStateToProps)(User);
