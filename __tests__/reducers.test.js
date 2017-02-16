import usersReducer from '../static/js/reducers/users';
import userInformationReducer from '../static/js/reducers/userDetailInformation';
import * as types from '../static/js/constants';

describe('Test all the reducers', () => {
  let USER_DETAIL_INFO,
    EMPTY_USER_INFO,
    ADD_NEW_USER,
    DEFAULT = '';
  beforeAll(() => {
    USER_DETAIL_INFO = types.USER_DETAIL_INFO;
    EMPTY_USER_INFO = types.EMPTY_USER_INFO;
    ADD_NEW_USER = types.ADD_NEW_USER;
  });

  describe('Test the users reducer', () => {
    it('should return the initial state', () => {
      expect(usersReducer(undefined, {})).toEqual([]);
    });
  });

  describe('Test the userInformation reducer', () => {
    it('should return default state when passed EMPTY string for default action', () => {
      expect(
          userInformationReducer(
            [
              { email: 'handersonj@about.com', first_name: 'Harry', gender: 'Male', id: 20, last_name: 'Anderson' }
            ],
            {
              type: DEFAULT
            }
          )
        )
        .toEqual(
        [
          { email: 'handersonj@about.com', first_name: 'Harry', gender: 'Male', id: 20, last_name: 'Anderson' }
        ],
      );
    });

    it('should return EMPTY object when passed EMPTY_USER_INFO action', () => {
      expect(
          userInformationReducer(
            [
              { email: 'handersonj@about.com', first_name: 'Harry', gender: 'Male', id: 20, last_name: 'Anderson' }
            ],
            {
              type: EMPTY_USER_INFO
            },
          )
      ).toEqual({});
    });

    it('should return object properties when passed ADD_NEW_USER action', () => {
      expect(
        userInformationReducer(
          [],
          {
            type: USER_DETAIL_INFO,
            email: 'handersonj@about.com',
            firstName: 'Harry',
            gender: 'Male',
            id: 20,
            lastName: 'Anderson'
          },
          {
            type: USER_DETAIL_INFO
          }
      )).toEqual(
        { email: 'handersonj@about.com', firstName: 'Harry', gender: 'Male', id: 20, lastName: 'Anderson' },
      );
    });

    it('should add newer object properties when passed USER_DETAIL_INFO action', () => {
      const expected = [{ email: 'johnrambo@badass.net', first_name: 'John', last_name: 'Rambo', gender: 'Male', id: 1}];
      expect(
        userInformationReducer(
          [],
          {
            type: ADD_NEW_USER,
            email: 'johnrambo@badass.net',
            firstName: 'John',
            lastName: 'Rambo',
            gender: 'Male',
            id: 1
          },
          {
            type: ADD_NEW_USER
          }
      )).toEqual(expect.arrayContaining(expected)['sample']);
    });
  });
});
