# Project_2

Name of app: theVisions

Description: 
The user has to sign up before using the app. After signing up, the user has access to the app.
The user can feed in an image URL into the form labeled 'Enter URL'. After submitting the link, the app will detect any text that's on the image and render what the sign says, along with the image. The user can also save the image to the database. 

Wireframes:
https://wireframe.cc/FSg6w3 -- Landing page
https://wireframe.cc/wqq3t5 -- App

Link to API:
https://cloud.google.com/vision/

Approach:
First thing I did was to make sure my API was working. At the beginning of this project, GoogleVision did have some problems with the API, and couldn't get an API Key. But, it's google. So it was solved the next day. 
I used Postman to make sure that I got the information that I wanted. And then started to build the app from there. 
I finished the Authentication part of the project as my first assignment. Then wrote the code to render the text from an image. Once I got that, I went on to work on CRUD applications.

Unsolved:
Did not implement an 'Update' feature due to the face that this app is based on links and it would be easier to find another image URL rather than updating one.
Was not able to fix the 'delete function'.
Was not able to implement cookies correctly, Images does not save to a specific user.
Was not able to implement translation feature.

Challenges:
I did have quite the amount of challenges for this project. I would've loved to implement the translation feature, but I had many problems just getting the Vision API to work the way I wanted it to, that I just didn't have the time to implement the translation feature. Hopefully in the future, I can go back to this project and finish it the way I wanted it to be.

Technologies Used:
HTML, CSS, JS, ES6, jQuery, Express, PostgreSQL
