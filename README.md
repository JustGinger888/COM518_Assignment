# COM518 Assignment: Points Of interest

## Instructions

### Project setup

```bash
npm install
```

### Compiles and hot-reloads for development

```bash
nodemon index.js
```

## Discussion on Development

### Part A – Develop a very simple REST API

For this REST API rather than setting up a local MySQL server, I made use of a MySQL service ([freedb.tech](www.freedb.tech)) and host the database. Proceeding to create and populate it after with the provided SQL file. This process would ideally make use of a .env file to configure the program accordingly and allow access, but for demonstration processes I have hard coded everything in as well.

![DB](asset\md\DB.png)

Initially, to ensure the functionality of my database, I started by creating a route with the suffix /poi which would involve an ajax call being made to my database that displays all of the data in a JSON format. This would later on act as a basis for all my other calls.

![DB](asset\md\poi.png)

#### 1. Look up all points of interest in a given region

For this search functionality I started by creating a route which takes in a form input and calls an ajax search service that looks for corresponding regions. The region to search for is added via a route parameter and ends up displaying most of the data in user friendly listed fashion.

```JS
async function ajaxSearch() {
    let region = document.getElementById("region").value;
    let response = await fetch(
    `http://localhost:8080/poi/region/${region}`
    );
    let text = await response.json();
    console.log(text);
    if (text.data.length == 0) {
    alert("There are no places associated with inputted regions");
    } else {
    text.data.forEach((element) => {
        document.getElementById(
            "results"
        ).innerHTML +=
        `<li class="list-group-item">
            ${element.id} | 
            Name: ${element.name} | 
            Recommendations: ${element.recommendations} 
            <button class="btn ml-2 btn-primary" onclick="ajaxRecommend(${element.id})">
                Recommend
            </button>
        </li>`;
    });
    }
}
```

The SQL logic for this code basically just selects most fields from the relevant database where the region is equal to the desired region. Storing the response as a json value and sending it back accordingly.

```SQL
SELECT id, name, type, description, recommendations, lon, lat
FROM pointsofinterest
WHERE region='${region}
```

#### 2. Add a new point of interest

Similar to the above, I created a route where users are prompted with a from that they have to input in order to add data to the MySQL database. All of the forms inputs are required and suitable error messages are coded in for if the service were to fail. The process then takes the body of the submitted form and adds it to the database.

```JS
async function ajaxAdd() {
    const body = {
    name: document.getElementById("name").value,
    type: document.getElementById("type").value,
    country: document.getElementById("country").value,
    region: document.getElementById("region").value,
    lat: document.getElementById("lat").value,
    lon: document.getElementById("lon").value,
    description: document.getElementById("description").value,
    };
    const response = await fetch("/poi/post", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(body),
    });
}
```

The SQL logic for this code inserts data from the requests body and populates the newly added record accordingly. Storing the response as a json value and sending it back to be used.

```SQL
INSERT INTO pointsofinterest
(name, type, country, region, lon, lat, description, recommendations)
VALUES
(?, ?, ?, ?, ?, ?, ?, ?),
[poi.name, poi.type, poi.country, poi.region, poi.lon, poi.lat, poi.description, 1]
```

![Add](asset\md\AddRes.png)

#### 3. Recommend a point of interest. This API endpoint should read in the POI ID and increase the number of recommendations by one for that POI

This ajax call is present in my region search functionality, I added a button to each result where, if clicked, a call is made to the recommendation service that increments the results corresponding table with 1. It accomplishes this by searching for the corresponding record based off the id.

```JS
async function ajaxRecommend(id) {
      const response = await fetch(
        `http://localhost:8080/poi/recommend/${id}`
      );
    }
```

For this SQL statement the recommendation of the provided req parameter ID is updated by incrementing with 1.

```SQL
UPDATE pointsofinterest
SET recommendations = recommendations + 1
WHERE ID='${id}
```

### Part B – Develop a simple AJAX-based JavaScript front-end

For this project I decided to make use of EJS as a view engine, as it allows me to make components that can be reused for multiple pages, and centralize my external scripts and links in the header of my project. Each page is linked and connected through a custom ejs component called navbar, which I added to allow easy navigation between page

The project makes use of bootswatch, a bootstrap variant, to display data in its own unique style, making it look nice and removing the need for custom css throughout my project.

s

#### 4. Search Page

This page allows users to search for all points of interest in a given region. The user can enter a region using the provided form. After the system makes use of JavaScript to communicate with the systems REST API finding and returning all points of interest in that region. The results are added to a list and appended accordingly using a foreach function.

![Search](asset\md\Search.png)

### 5. Add POI page

This page would allow the user to enter point of interest details into a provided form, using JavaScript to communicate with my web API it adds POI accordingly. The results are then sent and displayed on my database once completed.

![Search](asset\md\ADD.png)
![Search](asset\md\addRes.png)

#### 6. Reccomend button

When processing the search results, I create create a “Recommend” button for each result that, when clicked, sends an AJAX POST request to the REST API done in task 3. This increments the results accordingly and would allow the user to recommend the POI for others to see.

![Search](asset\md\London1.png)
![Search](asset\md\London2.png)

### Part C – Adding simple error-checking

#### 7. Error-checking

By making use of the required variable I can ensure that all fields of task 2s form are filled in by the user, ensuring that if any of the POI details are blank the appropriate message is sent back to the client. If something were to go wrong during the creation process I have made the system so that an alert displaying appropriate error code is returned in case of a problem with the creation call.

```JS
try {
    res.json(await pointsOfInterestPost.create(req.body));
} catch (err) {
    console.error(`Error while creating points of interest`, err.message);
    next(err);
}
```

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
