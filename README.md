# chat-app #

Chat app for mobile devices using React Native, Expo, and Google Firestore Database. <br>
The app will provide users with a chat interface and options to share images and their location. <br>
Testing can be done with Android Studio and iOS Emulator. 
<br>
![chat app 1](https://user-images.githubusercontent.com/80426764/136886464-56d88fc7-2379-48f8-b6ec-4e36fad1922e.png)
![chat app 2](https://user-images.githubusercontent.com/80426764/136886472-2acf5e88-96d1-4ff7-a6e5-6a179dcde7ff.png)

<br>
## User Stories ##
* As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
* As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
* As a user, I want to send images to my friends to show them what I’m currently doing.
* As a user, I want to share my location with my friends to show them where I am.
* As a user, I want to be able to read my messages offline so I can reread conversations at any time.
* As a user with a visual impairment, I want to use a chat app that is compatible with a screen
reader so that I can engage with a chat interface.

## Key Features ##
* A page where users can enter their name and choose a background color for the chat screen before joining the chat.
* A page displaying the conversation, as well as an input field and submit button.
* The chat must provide users with two additional communication features: sending images and location data.
* Data gets stored online and offline. Offline storage is done with AsyncStorage. Online is done with Firebase

## Technical Requirements ##
* The app must be written in React Native.
* The app must be developed using Expo.
* Chat conversations must be stored in Google Firestore Database.
* The app must authenticate users anonymously via Google Firebase authentication.
* Chat conversations must be stored locally.
* The app must let users pick and send images from the phone’s image library.
* The app must let users take pictures with the device’s camera app, and send them.
* The app must store images in Firebase Cloud Storage.
* The app must be able to read the user’s location data.
* Location data must be sent via the chat in a map view.
* The chat interface and functionality must be created using the Gifted Chat library.
* The app’s codebase must contain comments.

## Dependencies ##
* GiftedChat provides the chat UI for the project
* Netinfo is used to check online/offline status
* React Native Async Storage is used for key-value storage offline
* Expo Camera is used to render a preview for the camera
* Expo ImagePicker is used to select images and to take a photo
* Expo Location is used ot read geolocation data from the device
* React Native Maps is used to render the MapView
* React Navigation is used to create the navigation structure

## Database configuration ##
* Firebase credentials are entered in the Chat component when the app is online


## Setup

Install expo globally

https://docs.expo.dev/get-started/installation/

```
npm install --global-cli
```

Clone this repository to your directory
```
git clone https://github.com/joshmou95/chat-app.git
```

Navigate to your directory and install dependencies
```
npm install
```

Start the project
```
expo start
```

Scan the QR code with Expo Go (Android) or the Camera app (iOS)<br>
Run on iOS Emulator or Andriod Studio to chat back and forth




