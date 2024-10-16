This page is refering to the YouTube app on android. The link to the repository is : https://github.com/alindor185/server_android/tree/part4

Before we begin
In oreder to demonstrate all of the functions and actions you can do in our app you can check out the next video if you would like to :
https://www.veed.io/view/0a5b4af4-bae1-4cde-9d6b-3c3ebcc1355f?panel=quality-survey

##Updated Project Description: This YouTube-style app was developed in the Android Studio environment and is linked to a Node.js server with TCP connections. Please make sure both the server and TCP connections are running before you begin working on the app.

Work Breakdown: The development of this app is divided into two parts:

Part 1 – Basic Functionality:
We started with the essential components, including a login screen and sign-up screen, with full functionality. In this phase, we used hardcoded users to log in. The main page displayed a hardcoded feed of videos, fetched from a JSON list of videos, similar to a simple video feed.

Part 2 – Server Integration:
In the second part, we integrated the app with the Node.js server to make it fully functional. All operations related to fetching video data, uploading videos, user authentication, and comment handling were connected to the server. Data is now dynamically fetched from the server, allowing users to upload videos and post comments directly from the app. If you need to explore the specific code for each part:

Use the main branch to explore the first part, which contains only the basic functionality. Switch to the part4 branch using the provided link to view the second part, where we integrated the server-side functionalities.

Running the App
Now, let's start the app! We will guide you through the steps needed to run the YouTube-style Android app.

Make sure the required servers are running:

Ensure that the TCP server and Node.js server are up and running according to the instructions provided earlier. Set up the Android Studio environment:

Download and set up the Pixel 2 device emulator (or any preferred virtual device) in Android Studio. Press the "Sync Project with Gradle Files" button to sync the dependencies. Check the configuration:

Ensure that the configuration is set to "App" in Android Studio. Run the app:

Click the green triangle (Run button) in Android Studio to launch the app! Login and Sign-In The first page you'll encounter after starting the app is the Sign-In page.

Login and Sign in
To sign in to our YouTube-like app, you can use one of the users stored in MongoDB, or create your own account. If you'd like to create your own profile, press the Sign-Up button.

https://postimg.cc/v4xQgYvS You will be redirected to the Sign-Up page, where you must fill in the required fields: https://postimg.cc/tskz6bCW

Make sure to:
Use an email address in the format name@example.com. Create a password with at least 8 characters that contains both letters and numbers. Confirm your password (both values must match). Select a display name and upload a profile picture. Once all the fields are filled correctly, you will receive a success message and be redirected to the Sign-In page.

After signing in, you will receive a token that authorizes you to perform various activities within the app.

Feed Page Activity
Welcome to the main page of our app!

Here, you’ll find a feed of videos from other users, including people you don’t know.

What Can You Do on the Main Page? At the top of the app, you’ll see the YouTube logo and three icons. Below that, there’s a box where you can upload a new video or post your thoughts. You can upload a video with a description. If you only post text, no video will be attached by default. https://postimg.cc/mh6h6288 ###Navigation Menu: At the bottom of the screen, there is a menu bar with action buttons.

Menu Button (on the far left): Clicking this will display several options:

Light/Dark Mode: Switch between light and dark mode.

Edit Name, Edit Image, Delete User: Update or remove your profile: https://postimg.cc/bGHPHRwS