/*
  API routes
  The application rely on this file to get the API path
*/
const API = {
  root: 'http://swapi.co/api',
  path: {
    // Temporary API path for login.
    login: '/people/1',
    popularQuote: '/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10'
  }
}
export default API;
