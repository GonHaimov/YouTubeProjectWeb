# React Client Setup:

1. Navigate to the React front-end directory (AP_Ex_1_web-main) inside the YouTubeProjectWeb folder:
cd YouTubeProjectWeb/AP_Ex_1_web-main

2. Install the required dependencies:
npm install

3. Start the React development server:
npm start

You can see all the screenshots in under the folder 'screenshots'.
Clicking on the youtube logo which appear in all of the pages will lead you back to the home screen.

User Authentication (Login and Registration):

## Login and Sign in
In order to sign in to our YouTube app you can take one of the users from the mongoDB or to create one for yourself. <br>
If you want to make your own profile you can press the sign up button. <br>
Afterwards, you'll be transferd to the sign up page where you'll need to fill the required fields. <br>
Be aware, you'll have to fill all of the fields in order to finish the form. <br>
For example - the email address you sign up with must be from the pattern of name@example.com. <br>
For the password choosing it must be in the length of minimum 8 characters and contain letters and numbers.
After you sign in with us you'll get a spesific token that will allow you to make some of the activities we offer for our users by making sure you are indeed the person who are authorized to make the action. <br>

## Home Page:
In the home page, if you are a guest or not, you could watch one of the 20 different videos that are displaying on the page.
clicking on the video will move you to the 'Watch Video Page' where you can watch the video. If you are logged in User you will have the option to hit a like or hit a comment on the video.


Managing Videos (Create, Edit, Delete):

Instructions on uploading, editing, and deleting videos through the front-end.

## Upload Video
If you are a logged in user, u will have the option to upload a new video. on the top of the screen, you will have a 'plus' icon.
clicking on that icon will lead you to the upload Video page.
in this page you can upload a video from your local computer, select a title and a Thumbnail for the video, and set the duration for the video. after all of that, click the 'Upload' button.
The new video will be added to the videos displaying on the Home Page.

## Delete/Edit video
If you are the owner of the video, you will have the option to Edit or Delete the video. 
On the home page, when you are logged in, you can see under the videos that you have been uploaded, the options of delete and edit.
You can also doing it by enterign your profile page.

## Profile page
If you are logged in, you will see on the top of the screen, your profile picture. clicking on that photo will lead you to your user's Profile. In this page you will see your name and option to edit or delete the user.
You will also see all of the videos that you been uploaded, and you manage them by editing or delete.
cliking on a profile picture of a user will lead you to his profile page where you can see his details and videos.