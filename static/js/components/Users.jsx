import React, { PropTypes } from 'react';
import {browserHistory} from 'react-router';

const Users = ( { email, first_name, last_name, gender, id, props, onClick } ) => {

  const getUserInfo = element => {
    return {
      email: element.filter(elem => elem['dataset']['email'])[0].dataset['email'],
      firstName: element.filter(elem => elem['dataset']['firstName'])[0].dataset['firstName'],
      lastName: element.filter(elem => elem['dataset']['lastName'])[0].dataset['lastName'],
      gender: element.filter(elem => elem['dataset']['gender'])[0].dataset['gender'],
      id: element.filter(elem => elem['dataset']['id'])[0].dataset['id']
    };
  };

  const userDetail = event => {
    const userDetails = getUserInfo(Array.from(event.currentTarget.children));
    onClick(userDetails);
    browserHistory.push({
      pathname: `/user/${userDetails['id']}`,
      state: props
    });
  };

  return (
    <div className="users-container" onClick={event => userDetail(event)}>
        <span data-email={email} className="users-container-email">{email}</span>
        <span data-first-name={first_name} className="users-container-first-name">{first_name}</span>
        <span data-last-name={last_name} className="users-container-last-name">{last_name}</span>
        <span data-gender={gender} className="users-container-gender">{gender}</span>
        <span data-id={id} className="users-container-id">{id}</span>
    </div>
  );
};

Users.propTypes = {
  email: PropTypes.string,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  gender: PropTypes.string,
  id: PropTypes.string,
  props: PropTypes.array,
  onClick: PropTypes.func
};

export default Users;
