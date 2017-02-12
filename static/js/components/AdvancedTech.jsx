import React, { Component, PropTypes } from 'react';

import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap/lib';

import Users from './Users';

import * as constants from '../constants';

class AdvancedTech extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: this.props.users,
      showAddPopDown: false,
      genderValue: 'Male'
    };
    this.togglePopDown = this.togglePopDown.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
  }

  togglePopDown() {
    this.setState({
      showAddPopDown: !this.state.showAddPopDown
    });
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  addUser(event) {
    event.preventDefault();
    event.stopPropagation();
    const email = document.getElementById('emailInput') && document.getElementById('emailInput').value;
    const firstName = document.getElementById('firstNameInput') && document.getElementById('firstNameInput').value;
    const lastName = document.getElementById('lastNameInput') && document.getElementById('lastNameInput').value;
    const select = document.getElementById('genderSelect');
    const gender = select.options[select.selectedIndex].value;
    const id = Math.max.apply(Math, this.state.users.map(user => user['id'])) + 1;
    const newUser = {
      email,
      firstName,
      lastName,
      gender,
      id
    };
    this.props.addUserInfo(newUser);
    const users = this.props.getusers(this.state.users);
    console.log(users);
  }

  render() {

    const {
      users,
      showAddPopDown
    } = this.state;

    const {
      ADVANCED_TECH_USERS,
      ADD_USER,
      ADD,
      CLOSE,
      MALE,
      FEMALE,
      GENDER
    } = constants;

    let FieldGroup, FormInstance;
    if (showAddPopDown) {
      FieldGroup = ({ id, label, help, ...props }) => {
        return (
          <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
          </FormGroup>
        );
      };

      FormInstance = (
        <form onSubmit={this.addUser}>
          <FieldGroup
            id="emailInput"
            type="email"
            label="Email address:"
            placeholder="Enter email"
          />
          <FieldGroup
            id="firstNameInput"
            type="text"
            label="First Name:"
            placeholder="Enter First Name"
          />
          <FieldGroup
            id="lastNameInput"
            type="text"
            label="Last Name:"
            placeholder="Enter Last Name"
          />
          <FormGroup controlId="formControlsSelect">
            <ControlLabel>{GENDER}</ControlLabel>
            <FormControl id="genderSelect" componentClass="select" placeholder="select">
              <option value={MALE}>{MALE}</option>
              <option value={FEMALE}>{FEMALE}</option>
            </FormControl>
          </FormGroup>
          <Button bsStyle="primary" bsSize="large" type="submit">{ADD}</Button>
        </form>
      );
    }

    const UserArea = (
        users.map(info =>
            <Users  email={info['email']}
              first_name={info['first_name']}
              last_name={info['last_name']}
              gender={info['gender']}
              id={info['id']}
              props={this.props}
              onClick={this.props.getUserInfo}
            />
        )
    );

    return (
      <div className="advanced-tech-container">
        <div className="add-user-btn-container">
          <Button bsStyle="primary"
                  bsSize="large"
                  onClick={this.togglePopDown}>{!showAddPopDown && ADD_USER || CLOSE}
          </Button>
        </div>
        {FormInstance}
        <h2 className="advanced-tech-container-label"><strong>{ADVANCED_TECH_USERS}</strong></h2>
        {UserArea}
      </div>
    );
  }
}

AdvancedTech.PropTypes = {
  users: PropTypes.array
};

export default AdvancedTech;
