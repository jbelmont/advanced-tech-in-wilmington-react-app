import React from 'react';

import store from '../store';

import * as constants from '../constants';

const UserDetails = () => {
  const {
      ADVANCED_TECH_USERS
    } = constants;

  const userInformation = store && store.getState() && store.getState()['userInfo'];
  let email, firstName, lastName, gender;
  if (Object.keys(userInformation).length > 0) {
    email = userInformation['email'];
    firstName = userInformation['firstName'];
    lastName = userInformation['lastName'];
    gender = userInformation['gender'];
  } else {
    const storeInfo = store && store.getState() && store.getState()['users'];
    firstName = storeInfo['first_name'];
    lastName = storeInfo['last_name'];
    email = storeInfo['email'];
    gender = storeInfo['gender'];
  }

  const UserDetailsArea = (
        <div className="user-details-container">
            <span className="email">{email}</span>
            <span className="first-name">{firstName}</span>
            <span className="last-name">{lastName}</span>
            <span className="gender">{gender}</span>
        </div>
    );
  return (
        <div className="advanced-tech-container">
        <h2 className="advanced-tech-container-label"><strong>{ADVANCED_TECH_USERS}</strong></h2>
        {UserDetailsArea}
      </div>
  );
};

export default UserDetails;
