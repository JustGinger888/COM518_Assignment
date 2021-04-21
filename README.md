# COM518 Assignment: Points Of interest

## Instructions

### Project setup

``` bash
npm install
```

### Compiles and hot-reloads for development

``` bash
nodemon index.js
```

## Discussion on Development

### Part A – Develop a very simple REST API



1. Look up all points of interest in a given region. It should return the results as JSON.
2. Add a new point of interest. This API endpoint should simply read in the point of interest details as POST data, and add them to the database.
3. Recommend a point of interest. This API endpoint should read in the POI ID and increase the number of recommendations by one for that POI.
Task 1 can be tested directly in the browser. Use RESTer or a similar tool to test tasks 2 and 3.
If you get this far, you will achieve a F2

### Part B – Develop a simple AJAX-based JavaScript front-end

Next, you should build a simple HTML and JavaScript front-end which communicates with your REST API using AJAX (no page reload should be necessary).

4. Write an HTML page which allows the user to search for all points of interest in a given region. The user should be able to enter a region, and then, using JavaScript, the page should communicate with your REST API to find all points of interest in that region. The JSON must be parsed, and the results presented to the user in a user-friendly way.
5. Write another HTML page which allows the user to enter point of interest details. Again, using JavaScript, the page should communicate with your web API. Finally, using a standard HTML hyperlink, link the HTML page to the task 4 HTML page.
6. Modify your code to process the search results, so that you create a “Recommend” button for each result. When the user clicks on this button, you should send an AJAX POST request to the REST API (task 3) to allow the user to recommend the POI.
If you get this far, you will achieve a D2.

### Part C – Adding simple error-checking

7. Add error-checking to task 2, so that if any of the POI details are blank, an appropriate HTTP error code is sent back to the client. Then, in task 5, test for the HTTP code returned from the server and display an appropriate message to the user.
If you get this far, you will achieve a D1.
5
Academic Services
June 2017

### Part D – Adding a map

8. Using Leaflet, add an OpenStreetMap map to Task 4, so that the results are displayed as markers on the map. When a user clicks a marker, the point of interest name and description should appear as a popup.
You must use Leaflet and OpenStreetMap. In particular, Google Maps is NOT acceptable.
If you get this far, you will achieve a C3
9. Allow the user to add a POI by clicking on the map at a particular location. When the map is clicked, the user should be able to enter the POI details. When a button is clicked, the data should be sent over to your REST API (task 2). Check for errors returned from the REST API.
If you get this far, you will achieve a C1

### Part E – logins and sessions

10. Implement a session-based login system. A user should be able to login from the main index page (task 1). If a user logs in successfully, a message should appear within a <div> on the index page, e.g.
Logged in as jsmith
There is no need to implement a signup facility, as the SQL file to populate the database contains existing users.
If you get this far, you will receive a B2
11. Change task 2 so that a user must be logged-in to add a point of interest, sending back an appropriate HTTP error if they are not. Also change task 9 so that this error is checked, and an appropriate error message displayed to the user if they are not logged in.
(Note – if you know anything about REST you will realise that this violates the REST principle of statelessness. However, I am requiring you to do it here as this is an introductory server-side development module. In the real world you would probably use something like OAuth2 for authentication but this is beyond the scope of this module. However it is something you might want to investigate for your final-year project!)
If you get this far, you will receive a B1

### Part F – Implementing a review system

12. Add an additional endpoint to your REST API allowing clients to review a POI. It should read in the POI ID and review as POST data, and should check that the review is not blank, and that the user is logged in.
6
Academic Services
June 2017
No additional credit for this task, as it uses similar techniques to earlier tasks.
13. Add a review box to the popup from Task 8, allowing the user to enter a review. When the user enters a review, it must be sent, along with the POI ID, to the REST API (task 12). Check for errors returned from the REST API.
If you get this far, you will achieve an A4
Part G – Improving your answer
To get a higher A (A3, A2 or A1) you should enhance your answer, making use of more advanced topics from the module in your answer, for example some or all of the following:
- creating a well-structured Node application with models, controllers and routes and using ECMAScript 6 classes;
- using middleware as appropriate;
- using Passport for authentication rather than express-session;
- creating a professional-looking site, including handling errors in a user-friendly, “real-world” way.