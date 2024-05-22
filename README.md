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

## List of Application Features:

- **User Registration:** Users can sign up for the platform using their Google account credentials.
- **Profile Creation:** Upon registration, users can create a personalized profile detailing their fitness goals, preferences, and any relevant medical information.
- **Trainer Matching:** The platform employs a matching algorithm to pair users with suitable personal trainers based on their goals and preferences.
- **Customized Workout Plans:** Users receive personalized workout plans from their designated trainers, tailored to their fitness levels and objectives.
- **Progress Tracking:** Users can track their fitness progress over time, including workout completion, weight loss, muscle gain, and other relevant metrics.
- **Communication Tools:** The platform provides messaging and video call features to facilitate communication between users and their trainers.
- **Nutrition Guidance:** In addition to workout plans, users can receive dietary recommendations and nutritional guidance from their trainers.
- **Goal Setting:** Users can set specific fitness goals within the platform, with progress tracking and support from their trainers.
- **Motivational Content:** The platform offers motivational articles, videos, and tips to inspire and encourage users on their fitness journey.
- **Community Support:** Users can engage with a community of like-minded individuals, sharing experiences, advice, and encouragement.
- **Feedback Mechanism:** Users can provide feedback on workout plans, trainer performance, and overall platform experience to continually improve service quality.
- **Email Notifications:** Automated email notifications are sent to users upon successful registration or first sign-in via Google Account, welcoming them to the platform.

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
- [x] Implement feature: Trainer Matching algorithm ✔️
- [x] Deploy initial project version to Azure for testing
- [x] Develop Postman collection for testing user registration and profile creation endpoints ✔️
- [x] Refine documentation for Getting Started and project overview ✔️
- [x] Conduct initial code review and address any issues identified

### Week 4:
- [ ] Implement feature: Customized Workout Plans generation
- [x] Enhance user interface for profile creation and goal setting ✔️
- [x] Expand Postman collection to cover new features implemented ✔️
- [x] Begin drafting project documentation, including task decomposition ✔️
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
- [x] Implement feature: Feedback Mechanism integration
- [x] Conduct final regression testing to ensure all features function as expected
- [x] Monitor platform performance and address any last-minute issues or concerns
- [ ] Execute deployment plan and monitor the production environment for stability
- [x] Notify users of the platform launch and provide ongoing support as needed (replaced with a task Begin drafting project documentation, including task decomposition from WEEK 4)

### Week 12:
- [x] Review project performance and gather feedback from initial users
- [x] Identify areas for future enhancements and prioritize the feature roadmap
- [x] Begin planning for future iterations and updates based on user feedback and market trends
- [x] Closeout documentation, including lessons learned and project retrospective
- [x] Celebrate the successful platform launch with the team and stakeholders


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

- **Displaying  trainers:**
    - Provides information about each trainer and a button to request training.

- **Search for trainers:**
    - Provides ability to see another treiner with button click

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

- **Ability to send feedback:**
    - Users can send their opinion about site, what features is good, or coulld be better and also their rating of the site from  1 to 5

- **Displaying proposed videos:**
    - Users can see videos from youtube with further workouts and also motivational content 

- **Seting goals:**
    - Users can create goals to do this, they need to choose proposed template and write describtion 
    - Each goal can have status "in progress" or "completed"
    - Also users can see progress diagram for all completed and started goals

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

## Last-minute issues

1. Problems with sending training requests


## Feedback from initial users

1. Add email notification system 
2. Ability to add profile photo
3. Implement feature of adding photo/video progress(posts)
4. Create site  with ukrainan version 
5. Make description of goals optional 
6. Add a calorie tracker

## Identifying Areas for Future Enhancements and Prioritizing the Feature Roadmap

### Begin Planning for Future Iterations and Updates Based on User Feedback and Market Trends

#### **Identify Key Areas for Enhancement** Based on the feedback from users and current trends in the fitness industry, focus on the following areas for enhancement:
- **User Feedback Integration**
    - User Experience Improvements: Enhancing user profiles with features like profile photos and enabling users to post photo/video progress updates.
    - Localization: Creating a Ukrainian version of the site to better serve local users.
    - Health and Nutrition Tracking: Adding a calorie tracker to complement the existing nutritional guidance.
    - Notification Systems: Implementing an email notification system for various user activities and updates.
    - Customization and Flexibility: Making goal descriptions optional to provide more flexibility for users.

- **Market Trends**
    - Mobile App Development: As mobile usage continues to rise, developing a mobile app could enhance accessibility and user engagement.
    - AI-Powered Features: Implement AI-driven insights for workout plans, nutrition recommendations, and progress tracking.
    - Community Features: Introduce community forums or group challenges to foster a sense of community among users.

#### **Prioritize Feature Implementation**

- **Must Have:** These features address critical user needs and are essential for competitive market positioning.
    - Email Notification System (feedback)
    - Profile Photo Addition (feedback)
    - Ukrainian Version of the Site (feedback)
- **Should Have:** These features significantly enhance the user experience and engagement.
    - Photo/Video Progress Posts (feedback)
    - Calorie Tracker (feedback)
    - **Could Have:** These features are beneficial but not critical.
    - Optional Goal Descriptions (feedback)

#### **Develop a Feature Roadmap**
- **Email Notification System:**
    - Phase 1: Basic notifications (e.g., registration, goal achievements, reminders).
    - Phase 2: Advanced notifications (e.g., personalized tips, motivational messages).
- **Profile Photo Addition:**
    - Phase 1: Allow users to upload profile photos.
    - Phase 2: Implement photo editing and enhancement tools.
- **Ukrainian Version of the Site:**
    - Phase 1: Translate key content and interface elements.
    - Phase 2: Full localization and support for Ukrainian users.
- **Photo/Video Progress Posts:**
    - Phase 1: Enable users to upload photos and videos.
    - Phase 2: Introduce community features such as likes and comments.
- **Calorie Tracker:**
    - Phase 1: Basic calorie tracking and logging.
    - Phase 2: Integration with nutritional databases and fitness wearables.
- **Optional Goal Descriptions:**
    - Implement changes in the registration and profile settings forms to make goal descriptions optional.


#### What Was Successful
- **Technology Choices**: 
    - HTML, CSS, SASS: These technologies enabled the creation of a modern and attractive user interface.
    - JavaScript: Provided dynamic user interactions with the platform.
    - Node.js: Chosen as the server platform for its asynchronous request handling and performance improvement.
    - pgAdmin and Azure Database: Using Azure for database hosting ensured reliable data storage and easy management via pgAdmin.

- **First Azure Deployment**: 
    - Azure Deployment: The initial deployment to Azure was successful, indicating proper environment configuration and settings.

#### What Did Not Work
- **Subsequent Azure Deployments**:
    - Subsequent Deployments to Azure:
    Deployment Issues: Subsequent deployment attempts were unsuccessful, potentially due to configuration problems or updates in the Azure environment.
    - Setup Difficulties: Possible challenges in setting up the server environment or dependencies that changed after the initial deployment.

#### What Could Be Improved
- **Project Structure Optimization:**

    - Server Code Optimization: Review and optimize server logic to ensure faster request processing.
    - Code Refactoring: Examine and improve the code structure for better readability and maintainability.
- **Database Query Improvement:**

    - Query Optimization: Optimize SQL queries to reduce execution time.
    - Query Caching: Implement query caching to reduce database load and increase processing speed.
- **Deployment Process Improvement:**

    - Deployment Automation: Implement CI/CD (Continuous Integration/Continuous Deployment) processes to automate and streamline deployment.

### Action Plan
#### Immediate Actions(Next 1-2 months):

- *User Feedback Implementation:*

    - Develop the email notification system.
    - Enable profile photo uploads.
    - Start work on the Ukrainian version of the site.

#### Short-term Actions (Next 2-4 months):

- *User Experience Enhancements:*
    - Implement the ability to add photo/video progress posts.
    - Make goal descriptions optional.
- *Health and Nutrition Features:*
    - Integrate a calorie tracker.
- *Localization:*
    - Continue developing the Ukrainian version of the site to better serve local users.
- *Notification Systems:*
    - Complete the implementation of an email notification system for various user activities and updates.

#### Mid to Long-term Actions (4-6 months):
- *Mobile App Development:*
    - Develop a mobile app to enhance accessibility and user engagement as mobile usage continues to rise.

- *Community Features:*
    - Introduce community forums or group challenges to foster a sense of community among users.

#### Long-term Actions (Next 6-12 months):

- *AI-Powered Features:*
    - Implement AI-driven insights for workout plans, nutrition recommendations, and progress tracking.
- *Continuous Improvement:*
    - Regularly update the platform based on ongoing user feedback.
    - Monitor market trends and adapt features to stay competitive.

