/*
  API routes
  The application rely on this file to get the API path
*/
const API = {
  root: 'http://swapi.co/api',
  path: {
    // Temporary API path for login.
    login: '/people/1',
    missionList: '/people/',
    missionListPage: '/people/?page=',
    missionById: '/people/',
    planetById: '/planets/'
  }
}
export default API;
