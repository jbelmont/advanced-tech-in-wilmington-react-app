import React, { Component, PropTypes } from 'react';

import store from '../store';

import {ajax} from '../utils/ajax.js';

import { Button, FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap/lib';

import Users from './Users';

import * as constants from '../constants';

class AdvancedTech extends Component {

  static propTypes = {
    users: PropTypes.array,
    getUserInfo: PropTypes.func,
    addUserInfo: PropTypes.func,
    getusers: PropTypes.func
  };

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
    this._generateAddUserRoute = this._generateAddUserRoute.bind(this);
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
      first_name: firstName,
      last_name: lastName,
      email,
      gender,
      id
    };
    this.props.addUserInfo(newUser);
    return ajax(this._generateAddUserRoute(newUser))
      .then(() => {
        const users = store.getState()['users'];
        this.setState({
          users: users
        });
        this.togglePopDown();
      });
  }

  _generateAddUserRoute(user) {
    return {
      type: 'POST',
      route: '/api/v1/users/addUser',
      body: {
        user
      }
    };
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
          <FormGroup>
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
            <Users  data-email={info['email']}
                    email={info['email']}
                    data-first-name={info['first_name']}
                    first_name={info['first_name']}
                    data-last-name={info['last_name']}
                    last_name={info['last_name']}
                    data-gender={info['gender']}
                    gender={info['gender']}
                    data-id={info['id']}
                    id={info['id']}
                    key={info['id']}
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

export default AdvancedTech;
