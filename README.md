# AskATask - Comprehensive Task and Errand Management Application

## Introduction

Welcome to AskATask, a task and errand management application designed specifically for the Boston University (BU) community. Unlike other platforms, AskATask offers a user-friendly interface for both task creators and task takers, facilitating the creation, posting, and acceptance of tasks of varying scales and complexities. This application serves to bridge the gap between those who need tasks done and those willing to assist, fostering a collaborative environment within the BU community.

## Features

- **User-Friendly Interface:** AskATask provides an intuitive and easy-to-use platform for both task creators and task takers, ensuring a seamless experience for all users.

- **Diverse Task Range:** Users can create, post, and accept tasks of any scale and complexity, from minor daily errands to more substantial undertakings, catering to the diverse needs of the BU community.

- **Support for New Students:** AskATask assists new students in adapting to campus life by offering prompt assistance and connecting them with experienced task takers.

- **Faculty Support:** Busy faculty members can quickly find help for their tasks, allowing them to focus on their academic responsibilities.

- **Community Collaboration:** The application fosters a collaborative environment where everyone can lend a helping hand or seek assistance, promoting a vibrant BU ecosystem.

  **USING ENDPOINTS**
  1) Registering a user (POST)
     Endpoint: http://localhost:3000/login
     Payload:
     {
    "name":"Name of user",
    "bu_email": "BU email of user",
    "password": "password123",
    "conpass": "password123",
    "phone_number":"123456789"
    }
  3) Login (POST)
     Endpoint: http://localhost:3000/login
     Payload:
     {
    "bu_email": "amank19@bu.edu",
    "password": "password123"
     } //For testing purpose
     **Remember to store the JWT token**
  4) Creating a task (POST)
     Endpoint: http://localhost:3000/api/tasks/create
     Payload:
     {
    "title":"Grade Papers",
    "description":"50 papers need to be graded",
    "category":"Academic"
    }
    **Pass the token in headers section with key set to `Authorization` and value set the value of token**
  5) Fetch all tasks (GET)
     Endpoint: http://localhost:3000/api/tasks/
  6) Fetch a task by id (GET)
     Endpoint: http://localhost:3000/api/tasks/:taskId
     Example: http://localhost:3000/api/tasks/653aa82549cf63387dfdf518
  7) Fetch tasks accepted and completed by user (GET)
     Endpoint: http://localhost:3000/api/tasks/mytasks
  8) Update a specific task by its ID (PUT)
     Endpoint: http://localhost:3000/api/tasks/:taskId
     Example: http://localhost:3000/api/tasks/653aa82549cf63387dfdf518
     Payload:
     {
    "title":"Grade OS Papers",
    "description":"75 papers need to be graded",
    "category":"Academic"
    }
  9) Accepting a task (PUT)
     Endpoint: http://localhost:3000/api/tasks/accept/:taskId
     Example:  http://localhost:3000/api/tasks/accept/653aba2793bea1207829ad45
  10) Close a task (PUT)
      Endpoint:  http://localhost:3000/api/tasks/close/:taskId
      Example:  http://localhost:3000/api/tasks/close/653aba2793bea1207829ad45
  11) Delete a task (DELETE)
      Endpoint: http://localhost:3000/api/tasks/:taskId
      Example:  http://localhost:3000/api/tasks/653aba2793bea1207829ad45
      
     
  

     

