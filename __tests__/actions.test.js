import * as actions from '../static/js/actions';
import * as types from '../static/js/constants';

describe('Test Action Creators', () => {
  let GET_USERS,
    USER_DETAIL_INFO,
    ADD_NEW_USER;
  beforeAll(() => {
    GET_USERS = types.GET_USERS;
    USER_DETAIL_INFO = types.USER_DETAIL_INFO;
    ADD_NEW_USER = types.ADD_NEW_USER;
  });

  it('getUsers should create an action to get users', () => {
    const users = [
      { email: 'handersonj@about.com', first_name: 'Harry', gender: 'Male', id: 20, last_name: 'Anderson' },
      { email: 'dpayne3@cdbaby.com', first_name: 'Donna', gender: 'Female', id: 4, last_name: 'Payne' },
      { email: 'eelliott4@pen.io', first_name: 'Emily', gender: 'Female', id: 5, last_name: 'Elliott' },
      { email: 'jtucker2@tripadvisor.com', first_name: 'Jonathan', gender: 'Male', id: 3, last_name: 'Tucker' },
      { email: 'smedina1@addthis.com', first_name: 'Sean', gender: 'Male', id: 2, last_name: 'Medina' },
      { email: 'jflores9@icq.com', first_name: 'Joan', gender: 'Female', id: 10, last_name: 'Flores' },
      { email: 'kfisher8@wunderground.com', first_name: 'Kenneth', gender: 'Male', id: 9, last_name: 'Fisher' },
      { email: 'nlynche@163.com', first_name: 'Nancy', gender: 'Female', id: 15, last_name: 'Lynch' },
      { email: 'hkelly7@hubpages.com', first_name: 'Heather', gender: 'Female', id: 8, last_name: 'Kelly' }
    ];
    const expectedAction = {
      type: GET_USERS,
      users
    };
    expect(actions.getusers({ users })).toEqual(expectedAction);
  });

  it('getUserInfo should create an action that returns single user info to store', () => {
    const getUser = {
      email: 'handersonj@about.com',
      firstName: 'Harry',
      gender: 'Male',
      id: 20,
      lastName: 'Anderson'
    };

    const expectedAction = {
      type: USER_DETAIL_INFO,
      email: 'handersonj@about.com',
      firstName: 'Harry',
      gender: 'Male',
      id: 20,
      lastName: 'Anderson'
    };
    expect(actions.getUserInfo(getUser)).toEqual(expectedAction);
  });

  it('addUserInfo should create an action that adds user info to store', () => {
    const addUser = {
      email: 'johnrambo@badass.net',
      firstName: 'John',
      gender: 'Male',
      id: 1,
      lastName: 'Rambo'
    };

    const expectedAction = {
      type: ADD_NEW_USER,
      email: 'johnrambo@badass.net',
      firstName: 'John',
      gender: 'Male',
      id: 1,
      lastName: 'Rambo'
    };
    expect(actions.addUserInfo(addUser)).toEqual(expectedAction);
  });

  it('removeUser should remove a user from the store', () => {
    const actual = actions.removeUser({ index: 1 });
    const expected = { type: 'REMOVE_USER', index: 1 };
    expect(actual).toEqual(expected);
  });
});
