'use strict';

jest.mock('../static/js/data/index', () => 'data');
const mock = jest.fn();
mock('store');
jest.mock('../static/js/constants', () => 'constants');

import React from 'react';
import UserDetails from '../static/js/components/UserDetails';
import renderer from 'react-test-renderer';

test('Test the <UserDetails /> component', () => {
  const component = renderer.create(
    <UserDetails
      email='johnrambo@badass.net'
      firstName='John'
      lastName='Rambo'
      gender='Male'
    />
  );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
