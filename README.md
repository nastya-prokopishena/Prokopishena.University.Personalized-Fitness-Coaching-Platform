# Prokopishena.University.Personalized-Fitness-Coaching-Platform

## Author information
- Name and surname: Anastasiia Prokopishena
- Email: prokopishena.anastasia@gmail.com
- Telegram: https://t.me/yoon_hwoo
- Name of Project: Personalized Fitness Coaching Platform
- Email of the student: anastasiia.prokopishena@lnu.edu.ua
- Link to github, where source code is stored: https://github.com/nastya-prokopishena/Prokpishena.University.Personalized-Fitness-Coaching-Platform.git

## Project Description
The Personalized Fitness Coaching Platform is a web-based service designed to connect users with personal trainers for tailored workout plans and ongoing health support. Through the platform, users can set health goals, access customized exercise routines, track their progress, and communicate with their designated trainers.

## Getting Started

### Clone the Repository
1. Open your command line or terminal on your computer.
2. Use the git clone command to clone the repository:
https://github.com/nastya-prokopishena/Prokpishena.University.Personalized-Fitness-Coaching-Platform.git

### Install .Node.js
1. Ensure that you have installed the .NET SDK.
2. In the terminal, navigate to the project directory:
cd your-repository

### Run the Project Locally
1. In the terminal, use the following command to run the project
npm start
2. Open your web browser and go to link (with HTTPS)
localy: http://localhost:3000
azure: https://fitness-platform.azurewebsites.net/

### Architecture diagram
![Діаграма архітектури](/Prokopishena.University.Personalized-Fitness-Coaching-Platform.Web//static/images/Architecture_diagram.drawio.png)


## Розклад завдань проекту
Додайте розклад розбиття завдань тут.

### Week 1:
- [ ] Implement feature: User Registration with Google Account (OAuth 2.0)
- [x] Set up Azure environment for project deployment
- [x] Create initial project structure on Github repository
- [x] Draft Getting Started documentation for local project setup
- [x] Begin designing architecture and infrastructure diagrams

### Week 2:
- [x] Implement feature: Profile Creation
- [ ] Configure Continuous Integration/Continuous Delivery pipeline on Azure
- [x] Write Unit Tests for User Registration functionality
- [ ] Finalize architecture and infrastructure diagrams
- [x] Update Readme.md with project overview and architecture details

### Week 3:
- [ ] Implement feature: Trainer Matching algorithm
- [x] Deploy initial project version to Azure for testing
- [ ] Develop Postman collection for testing user registration and profile creation endpoints
- [ ] Refine documentation for Getting Started and project overview
- [x] Conduct initial code review and address any issues identified

### Week 4:
- [ ] Implement feature: Customized Workout Plans generation
- [ ] Enhance user interface for profile creation and goal setting
- [ ] Expand Postman collection to cover new features implemented
- [ ] Begin drafting project documentation, including task decomposition
- [ ] Perform integration testing for user registration and profile creation workflows

### Week 5:
- [ ] Implement feature: Progress Tracking functionality
- [ ] Optimize database queries for improved performance
- [x] Conduct code refactoring and ensure codebase cleanliness
- [x] Update project documentation with architecture and infrastructure diagrams
- [x] Review and update unit tests for new features and code changes

### Week 6:
- [ ] Implement feature: Communication Tools integration
- [ ] Enhance user experience with real-time chat and video call features
- [ ] Conduct load testing to assess platform scalability and performance under high usage
- [ ] Finalize project documentation, including task decomposition and testing strategies
- [ ] Prepare for user acceptance testing phase by outlining test scenarios and criteria

### Week 7:
- [ ] Implement feature: Nutrition Guidance integration
- [x] Refine user interface based on feedback from initial testing
- [x] Conduct security assessment and implement necessary measures to ensure user data protection
- [ ] Review and optimize email notification system for reliability and delivery speed
- [x] Prepare release notes for the initial platform launch

### Week 8:
- [ ] Implement feature: Goal Setting functionality
- [ ] Conduct user acceptance testing with selected individuals to gather feedback
- [ ] Address any identified issues or bugs from the user testing phase
- [ ] Perform final performance tuning and optimization before production deployment
- [ ] Update project documentation with final testing results and performance metrics

### Week 9:
- [ ] Implement feature: Motivational Content integration
- [ ] Conduct comprehensive end-to-end testing of all platform features
- [ ] Prepare documentation for platform maintenance and future development guidelines
- [ ] Finalize deployment scripts and procedures for a smooth production rollout
- [ ] Coordinate with the marketing team for promotional activities and platform launch announcements

### Week 10:
- [ ] Implement feature: Community Support features
- [ ] Perform final security audit and penetration testing
- [ ] Conduct training sessions for support staff on platform usage and troubleshooting
- [ ] Prepare customer support resources, including FAQs and troubleshooting guides
- [ ] Confirm readiness for production deployment and launch date with stakeholders

### Week 11:
- [ ] Implement feature: Feedback Mechanism integration
- [ ] Conduct final regression testing to ensure all features function as expected
- [ ] Monitor platform performance and address any last-minute issues or concerns
- [ ] Execute deployment plan and monitor the production environment for stability
- [ ] Notify users of the platform launch and provide ongoing support as needed

### Week 12:
- [ ] Review project performance and gather feedback from initial users
- [ ] Identify areas for future enhancements and prioritize the feature roadmap
- [ ] Begin planning for future iterations and updates based on user feedback and market trends
- [ ] Closeout documentation, including lessons learned and project retrospective
- [ ] Celebrate the successful platform launch with the team and stakeholders


##Functions
### `profile.js`

- **`showNutritions(event)`**:
    - Event handler triggered when a button is clicked. Retrieves the `clientId` from the button's data attribute and the `trainerId` for the client.
    - Fetches the `requestId` using the `clientId` and `trainerId`.
    - If successful, shows a modal window and sets the `requestId` in the form.

- **`displayClientsForTrainer(trainerId)`**:
    - Fetches and displays a list of clients for a given trainer ID.
    - For each client, it displays additional information and creates buttons for showing all information and nutrition guidance.

- **`toggleClientInfo(event)`**:
    - Toggles the visibility of additional information for a client when a button is clicked.

- **`getUserInfo(userId)`**:
    - Fetches and displays user information based on the provided `userId`.

- **`getClientId(userId)`**:
    - Fetches and returns the `client_id` for a given `userId`.

- **`getTrainerId(userId)`**:
    - Fetches and returns the `trainer_id` for a given `userId`.

- **`displayUserInfo(userInfo)`**:
    - Displays user information on the webpage.

- **`fetchSpecializations()`**:
    - Fetches and displays specializations available in the application.

- **`displayTrainers(trainers)`**:
    - Displays a list of trainers, including information about each trainer and a button to request training.

- **`requestTraining(trainerId)`**:
    - Sends a request for training to a specific trainer ID.

- **`checkExistingRequests(userId)`**:
    - Checks if there are existing training requests for a given user ID.

- **`findTrainer()`**:
    - Searches for and displays a list of trainers.

- **`showClientInformation(clientId)`**:
    - Displays information about a client based on their `clientId`.

- Event handlers for profile editing, form submission, and adding profiles.

### `nutrition.js`

- **`createNutritionModal()`**:
    - Creates a modal window with a form for entering nutrition recommendations.
    - Includes fields for the `request_id` and a text area for recommendations.
    - Adds the modal window to the document body.

- **`fetchRequestId(clientId, trainerId)`**:
    - Sends a POST request to the server to fetch `request_id` using `clientId` and `trainerId`.
    - Returns the `request_id` or `null` in case of an error.

- **`showNutritions(event)`**:
    - Event handler triggered when a button is clicked.
    - Retrieves `clientId` from the button's attribute and finds the `trainerId` for this client.
    - Obtains `requestId` for the given `clientId` and `trainerId`.
    - If successful, shows a modal window and sets `requestId` in the form.

- **`closeModal()`**:
    - Closes the modal window by changing its display style.

- **`handleSubmitNutrition(event)`**:
    - Event handler for submitting the form with nutrition recommendations.
    - Prevents the default form submission.
    - Fetches values of `requestId` and recommendations from the form.
    - Sends a POST request to `/nutrition-guidance` with the request ID and recommendations.
    - Closes the modal window after successful form submission.

### `login.js`

- **Login Form Handling**:
    - Adds an event handler for form submission on page load.
    - Fetches form data such as email and password and sends a POST request to `/login`.
    - On successful login, stores `user_id` in local storage and redirects the user to `trainingPlans.html`.
    - Displays error messages in case of any errors.

### `form.js`

- **Switching Between Login and Registration Forms**:
    - Adds event handlers for clicking on registration or login links.
    - Hides the login form and shows the registration form, or vice versa, depending on which link is clicked.

### `registration.js`

- **Registration Form Handling**:
    - Adds an event handler for form submission on page load.
    - Fetches form data such as name, surname, email, password, date of birth, gender, and phone number.
    - Sends a POST request to `/register` with the form data.
    - Stores the user's gender in local storage.
    - Displays error messages if any occur during registration.
