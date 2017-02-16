'use strict';

jest.mock('../static/js/components/Users', () => 'Users');
jest.mock('../static/js/data/index', () => 'data');
jest.mock('../static/js/store/index', () => 'store');
jest.mock('react-bootstrap/lib');
jest.mock('../static/js/utils/ajax.js', () => 'ajax');
jest.mock('../static/js/constants', () => 'constants');

import React from 'react';
import AdvancedTech from '../static/js/components/AdvancedTech';
import renderer from 'react-test-renderer';

test('Test the <AdvancedTech /> component', () => {
  const users = [
    { first_name: 'john', last_name: 'rambo', id: 1 },
    { first_name: 'chuck', last_name: 'norris', id: 2 }
  ];
  const showAddPopDown = false;
  const component = renderer.create(
    <AdvancedTech
      users={users}
      showAddPopDown={showAddPopDown}
      genderValue='Male'
      getUserInfo={() => {}}
      addUserInfo={() => {}}
      getusers={() => {}}
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
