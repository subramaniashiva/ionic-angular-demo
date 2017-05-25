Star Wars Viewer
===================

This application lists Star Wars character and provides detail about the character. The main purpose of the application is to learn Ionic and Angular.

Setup
-----

1)  Clone this repo using the following command

`git@github.com:subramaniashiva/ionic-angular-demo.git`


2)  Move to the repo that you have just cloned and run the following command

`npm install`

3) To start the app, run

`ionic serve`
  Navigate to localhost:8100 in your browser to view the app

4) To lint the project, run

`npm run lint`

5) To build the project for production, run

`npm run build`

6) To run unti tests for the project. (Please note that the coverage is not 100%)

`npm run test`


Tech Stack
----------
Following is the tech stack:

 - **Ionic 3** - Framework to build hybrid apps
 - **Angular 4** - MVC framework to build the applicaion
 - **TypeScript** - The super set of JavaScript. Provides static typing to the js files
 - **SASS** - Using SASS files instead of plain CSS
 - **TSLint** - Used to lint the TypeScript code

Directory Structure
-------------------
 - **www** - Contains the distributable version of the project. Ideally this folder gets pushed into the Docker or production server.
 - **src** - Contains the source code of the app.
 - **resources** - Contains resources for android and iOS app.

src directory
-----------------
 - **app** - Files related to initialisation of the application.
 - **assets** - Assets such as images for the application. 
 - **pages** - Contains the pages of the application. Each page in the application will have one folder. Each folder will have view, type script files and sass files for styling.
 - **providers** - Contains the services used by the application. Each service will have its own folder.
 - **theme** - Styles for the application.
 - **utils** - Contains helper and utility functions for the application.

Git Flow
-------
This project uses Git Flow for developing. 
 - **master** - The main branch. Resembles the production version.
 - **develop** - The current development version of the product. Contains code that are ready to be pushed into master. 
 - **feature/x** - Feature branch, branched off from develop. To develop a new feature create new feature branch from the develop and start. Merged into develop when the feature is ready.
 - **fix/x** - Branch to fix bugs in the application. Branched off from develop and merged back when ready.

Coding Guidelines
-------
- JSDoc commenting structure is followed throughout the code. This will be useful if we want to generate documentation for the project in future.
- BEM/OCSS is followed for sass files. UI is divided into objects, components, layout and the class are prefixed with o-, c-, l- respectively. Items of the component are mentioned with __ in the class.
- Strict typing is followed in all JS files.
- API path is loaded from a separate utils file. It will easier to change the API path in future.

Using the application
-------
- To log in to the application use 'test' for both email and password.
- Though the login is mocked, when clicking the sign in button the application fires an actual API request and based on the response logs in the user. This will be useful to replace the mock API with original api in future.
- Only the 'Available Missions' page is active. Rest of the pages will redirect the user to 'Dashboard page'.
- User can log out from the application by clicking the power icon at the bottom of the menu. Again log out is mocked, but it actually calls the log out method from Auth service and then logs out the user. The log out method in Auth service just sets current user property to null and sets the root view as Login component. This will be useful when we replace the logout method with actual logout method in future
- When the user clicks 'More Info' button in the mission list page, it pushes another detail view. The detail view page fires another API request to get the planet details and displays it to the user.
- The application is enabled with URL routing. User can directly enter any URL and the application just works fine.

Future Improvements
-------
- Increase coverage for unit testing.
- Proper error logging service instead of console logs.
- Add Chat view.
- Add Tabs in Mission Details page.
- Making the application progressive.
