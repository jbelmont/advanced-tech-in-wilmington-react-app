import usersReducer from '../static/js/reducers/users';
import userInformationReducer from '../static/js/reducers/userDetailInformation';
import * as types from '../static/js/constants';

describe('Test all the reducers', () => {
  let USER_DETAIL_INFO,
    EMPTY_USER_INFO,
    ADD_NEW_USER,
    REMOVE_USER,
    DEFAULT = '';
  beforeAll(() => {
    USER_DETAIL_INFO = types.USER_DETAIL_INFO;
    EMPTY_USER_INFO = types.EMPTY_USER_INFO;
    ADD_NEW_USER = types.ADD_NEW_USER;
    REMOVE_USER = types.REMOVE_USER;
  });

  describe('Test the users reducer', () => {
    it('should return the initial state', () => {
      expect(usersReducer(undefined, {})).toEqual([]);
    });

    it('should remove user when passed REMOVE_USER action', () => {
      const actual = usersReducer(
        [
          { id: 1, first_name: 'Timothy', last_name: 'Cox', email: 'tcox0@dion.ne.jp', gender: 'Male' },
          { id: 2, first_name: 'Sean', last_name: 'Medina', email: 'smedina1@addthis.com', gender: 'Male' },
          { id: 3, first_name: 'Jonathan', last_name: 'Tucker', email: 'jtucker2@tripadvisor.com', gender: 'Male' },
          { id: 4, first_name: 'Donna', last_name: 'Payne', email: 'dpayne3@cdbaby.com', gender: 'Female' },
          { id: 5, first_name: 'Emily', last_name: 'Elliott', email: 'eelliott4@pen.io', gender: 'Female' },
          { id: 6, first_name: 'Howard', last_name: 'Wallace', email: 'hwallace5@latimes.com', gender: 'Male' },
          { id: 7, first_name: 'Jacqueline', last_name: 'George', email: 'jgeorge6@soup.io', gender: 'Female' },
          { id: 8, first_name: 'Heather', last_name: 'Kelly', email: 'hkelly7@hubpages.com', gender: 'Female' },
          { id: 9, first_name: 'Kenneth', last_name: 'Fisher', email: 'kfisher8@wunderground.com', gender: 'Male' },
          { id: 10, first_name: 'Joan', last_name: 'Flores', email: 'jflores9@icq.com', gender: 'Female' }
        ],
        {
          type: REMOVE_USER,
          index: 4
        }
      );
      console.log(actual);
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
