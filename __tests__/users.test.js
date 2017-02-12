import React from 'react';
import Users from '../static/js/components/Users.jsx';
import renderer from 'react-test-renderer';

test('Test the <Users /> component', () => {
  const props = [];
  const component = renderer.create(
    <Users
      email="johnrambo@badass.net"
      first_name="John"
      last_name="Rambo"
      gender="Male"
      id="1"
      props={props}
      onClick={() => {}}
    />,
    );
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
