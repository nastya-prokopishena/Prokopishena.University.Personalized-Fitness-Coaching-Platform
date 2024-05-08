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
1. Download and install Node.js from the official website.
2. Follow the wizard instructions during installation and choose the default settings.

### Project Setup
1. After cloning the repository, navigate to the project directory:

cd Prokpishena.University.Personalized-Fitness-Coaching-Platform


### Run the Project Locally
1. In the terminal, use the following command to run the project

npm start
2. Open your web browser and go to link (with HTTPS)
localy: http://localhost:3000
azure: https://fitness-platform.azurewebsites.net/

### Architecture diagram
![Діаграма архітектури](/Prokopishena.University.Personalized-Fitness-Coaching-Platform.Web//static/images/Architecture_diagram.drawio.png)


## Розклад завдань проекту

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
- [x] Implement feature: Goal Setting functionality
- [x] Conduct user acceptance testing with selected individuals to gather feedback
- [x] Address any identified issues or bugs from the user testing phase
- [x] Perform final performance tuning and optimization before production deployment
- [x] Update project documentation with final testing results and performance metrics

### Week 9:
- [x] Implement feature: Motivational Content integration
- [x] Conduct comprehensive end-to-end testing of all platform features 
(replacement with a task Develop Postman collection for testing user registration and profile creation endpoints from WEEK 3)
- [x] Prepare documentation for platform maintenance and future development guidelines 
(replacement with a task  Enhance user interface for profile creation and goal setting from WEEK 4 )
- [x] Finalize deployment scripts and procedures for a smooth production rollout 
(replacement with a task Expand Postman collection to cover new features implemented from WEEK 4)
- [x] Coordinate with the marketing team for promotional activities and platform launch announcements 
( replacement with a task  Refine documentation for Getting Started and project overview from WEEK 3)

### Week 10:
- [ ] Implement feature: Community Support features
- [x] Perform final security audit and penetration testing (replacement with a task Implement feature: Trainer Matching algorithm from WEEK 3)
- [x] Create a scripts for data generation (replacement from requirements)
- [x] Prepare customer support resources, including FAQs and troubleshooting guides
- [x] Enhance user interface for motivational content and FAQs and troubleshooting guides

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


## Functions
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

### On the website:

- **Displaying a list of clients for a particular trainer:**
    - Includes additional information and buttons for showing all information and nutrition recommendations.

- **Toggling the visibility of additional information about a client:**
    - Triggered when a button is clicked.

- **Displaying user information:**
    - Presents user details on the webpage.

- **Displaying specializations:**
    - Lists available specializations in the application.

- **Displaying a list of trainers:**
    - Provides information about each trainer and a button to request training.

- **Sending a request for training to a specific trainer:**
    - Allows the user to make a training request.

- **Searching for and displaying a list of trainers:**
    - Helps users find trainers.

- **Displaying information about a client:**
    - Uses the client ID to show client information.

- **Creating a modal window with a form for entering nutrition recommendations:**
    - Allows the user to input recommendations.

- **Displaying a modal window with a form for entering nutrition recommendations:**
    - Shows a form for the user to provide nutrition recommendations.

- **Closing the modal window:**
    - Handles the process of closing the modal.

- **Handling form submission with nutrition recommendations:**
    - Manages form submission for nutrition recommendations.

- **Handling login form submission:**
    - Adds an event handler on page load to process login input data (email and password).

- **Storing the user ID in local storage and redirecting the user:**
    - Redirects the user to the training plans page and saves the user ID.

- **Switching between login and registration forms:**
    - Manages the switch between login and registration forms.

- **Handling the registration form:**
    - Works with input data and saves the user's gender in local storage.
- **Creating Instruction Videos:**
    - Admin can fill out a form to create a new instruction video.
    - The form includes fields for title and YouTube URL.
    - Upon submission, the video is added to the system and displayed on the website.

- **Managing Quotes:**
    - Users can add new quotes via a form.
    - The form includes a text field for entering the quote.

- **Displaying Random Quotes:**
    - Users can view a random quote displayed on the page, which changes daily and is stored locally to ensure consistency



##  USER`S FEEDBACK 

- [x] Message about uncorrect password 
- [x] Massage about acount creation 
- [x] Appearence of personal information before user choose role 
- [x] Close button for Addition information form 
- [x] Close button for "Findign trainer" form-list 
- [x] Edit personal information not with all values, but with opportunity input only one, or two values 
- [x] Display on the user page additional information 


# Performance Testing with Apache

## Overview

This results of performance testing conducted using Apache. The tests were conducted under varying levels of load to evaluate the server's performance.

## Test Results

### Test 1: 30 total requests with 10 concurrent connections

- **Requests per second:** 266.76
- **Time per request (mean):** 37.487 ms
- **Connection Times (ms):**
  - 50%: 27
  - 66%: 34
  - 75%: 36
  - 80%: 36
  - 90%: 42
  - 95%: 42
  - 98%: 42
  - 99%: 42
  - 100%: 42 (longest request)

### Test 2: 1000 total requests with 100 concurrent connections

- **Requests per second:** 1227.24
- **Time per request (mean):** 81.484 ms
- **Connection Times (ms):**
  - 50%: 75
  - 66%: 82
  - 75%: 88
  - 80%: 90
  - 90%: 91
  - 95%: 92
  - 98%: 98
  - 99%: 99
  - 100%: 107 (longest request)

### Test 3: 3000 total requests with 1000 concurrent connections

- **Requests per second:** 973.93
- **Time per request (mean):** 1026.772 ms
- **Connection Times (ms):**
  - 50%: 854
  - 66%: 958
  - 75%: 1002
  - 80%: 1026
  - 90%: 1347
  - 95%: 1391
  - 98%: 1415
  - 99%: 1423
  - 100%: 1448 (longest request)

## Conclusion

Based on the performance testing results:

1. Performance improves with an increase in the number of requests and concurrent connections.
2. Response time per request increases with higher loads.
3. Connection establishment time also increases with higher loads.
4. The server demonstrates stability with consistent results across tests.
