# leetcode-progress-tracker
This is a full stack web app that helps students to track their progress when practicing leetcode questions.

## Technogies applied to this project

### Backend:

- This project was developed in Java, implemented Spring MVC backend with Spring Data JPA to support CRUD functions.
- Created servlets with REST APIs to handle HTTP requests and responses.
- Spring Security is applied to implement JWT based authentication.
- The app was developed with the MySQL Relational Database

### Frontend:
- Created interactive web pages with ReactJS and the project is powered by bootstrap.
- Used Redux with React for state management between interaction of each component within the app.

## Functions of the app

1. Group different leetcode questions based on their data structures or algorithms topics.
2. Mark the status of each question with TODO, IN PROGRESS or FINISHED to keep track with students practicing schedule.
3. Rate each question with its priority in terms of poplularity, frequency, etc.
4. Each user is required to create his/her account to better manage their info and group of questions.


## Steps to run the app in development mode

* Before running the application, we assumed that you have MySQL and Java 8 installed in your local machine.

1. Run the backend project on a IDE that supports Java(IntelliJ Idea, Eclipse, etc)

2. Run the frontend project with the command `npm start`

3. Open [localhost:3000](localhost:3000) to view the app in the browser.

