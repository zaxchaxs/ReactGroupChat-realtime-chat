# Realtime Chat Group with React dan Firebase Firestore

This project is a web application for real-time group chat built using React, Tailwind, and React Router for the frontend, and Firebase Firestore for the backend. The application allows users to communicate within a group instantly with real-time message updates. Below are the main features and an explanation of how this application works.

## Main Features

1. **User Authentication**:
   - Users can login using Firebase Authentication.
   - Supports Google method authentication.

2. **Realtime Chat**:
   - Messages sent by users appear immediately in the chat interface without needing to refresh the page.
   - Uses Firebase Firestore to store and manage messages in real-time.
  
3. **Responsive Design**:
   - A responsive and user-friendly interface design, accessible on various devices such as desktops, tablets, and phones.
  
4. **Group Chat**:
   - Users can create new chat groups and join existing groups.
   - Each group has a separate chat room with message history stored in Firestore.

<div align="center">
  
## Tech Used
[![My Skills](https://skillicons.dev/icons?i=js,react,vite,tailwind,firebase&theme=light)](https://skillicons.dev)

</div>

## How It Works

1. **Firebase Initialization**:
   - The application initializes with Firebase configuration to connect with Firestore and Authentication.

2. **Authentication**:
   - Users should login first to access chat page, login can be access in the hompage.
   - After logging in, users can access chat page.

3. **Creating and Managing Groups**:
   - Users can create new chat groups or select existing groups from the group list.
   - Each group has a unique ID used to identify the chat room in Firestore.

4. **Sending and Receiving Messages**:
   - Messages sent by users are stored in the corresponding Firestore collection for the selected group.
   - Firestore provides real-time updates so new messages appear instantly on all devices connected to that group.

## Getting Started

1. **Clone the repository**:
   ```bash
   git clone https://github.com/zaxchaxs/ReactGroupChat-realtime-chat.git
   cd ReactGroupChat-realtime-chat

2. Install dependencies with your package manager
   ```bash
   npm install

3. Configure Firebase
   - Go to the firebase console, and create a project there.
   - Copy the Firebase configuration.
  
4. Create file .env and paste the firebase configuration in the file
   - Format of the configuration should be like this:
   ```bash
   VITE_REACT_APP_API_KEY=
   VITE_REACT_APP_AUTH_DOMAIN=
   VITE_REACT_APP_PROJECT_ID=
   VITE_REACT_APP_STORAGE_BUCKET=
   VITE_REACT_APP_MESSAGING_SENDER_ID=
   VITE_REACT_APP_APP_ID=
   VITE_REACT_APP_MEASUREMENT_ID=

5. Run the application
   ```bash
   npm run dev
  - Open a browser and go to http://localhost:5173

## License
This project is licensed under the GPL-3.0 License. See the LICENSE file for more information.
   
