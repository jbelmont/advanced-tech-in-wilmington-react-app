module.exports = {
  responseCodes: {
    created: 201,
    ok: 200,
    unauthorized: 401,
    found: 302,
    nocontent: 204
  },
  requestURL: 'https://localhost:3000',
  endPoints: {
    addUserUrl: '/api/v1/users/addUser',
    removeUserUrl: '/api/v1/users/removeUser',
    indexRouteUrl: '/',
    getUserUrl: '/user'
  }
};
