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

### Login Credentials

```bash
Mail:       test@mail.com
Password:   password
```

## Discussion on Development

### Part A – Develop a very simple REST API

For this REST API rather than setting up a local MySQL server, I made use of a MySQL service ([freedb.tech](www.freedb.tech)) and host the database. Proceeding to create and populate it after with the provided SQL file. This process would ideally make use of a .env file to configure the program accordingly and allow access, but for demonstration processes I have hard coded everything in as well.

![DB](asset\md\DB.png)

In my design U make use of a config file to store various keys and functions crucial to the program. They consist of passport configs, authentication functions and mongoDB keys all of which will later be used to complete further tasks.

For the rest of the project I made use of an MVC development stack as it separates and isolates key services (controllers) from views and allows for a better working environment.

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

#### Troubles Part A

Troubles I faced with this kind of approach was deviating from what we were taught and isolating each of the ajax call into its route and respective file. I also didn't fully understand how to access route parameter which required me to look into it. However I was able to successfully fill in my gaps of knowledge and produce 3 working calls.

### Part B – Develop a simple AJAX-based JavaScript front-end

For this project I decided to make use of EJS as a view engine, as it allows me to make components that can be reused for multiple pages, and centralize my external scripts and links in the header of my project. Each page is linked and connected through a custom ejs component called navbar, which I added to allow easy navigation between pages.

The project makes use of bootswatch, a bootstrap variant, to display data in its own unique style, making it look nice and removing the need for custom css throughout my project. This also provides a unified and dignified look to the project, lending itself to clear consistency throughout for users.

#### 4. Search Page

This page allows users to search for all points of interest in a given region. The user can enter a region using the provided form the entire page consists of. After the system makes use of JavaScript to communicate with the systems REST API finding and returning all points of interest in that region. The results are added to a list and appended accordingly using a foreach function.

![Search](asset\md\Search.png)

#### 5. Add POI page

This page would allow the user to enter point of interest details into a provided form, using JavaScript to communicate with my web API it adds POI accordingly. The results are then sent and displayed on my database once completed.It consists of a form with multiple required inputs that need to be filled out before any requests can be made.

![Search](asset\md\ADD.png)
![Search](asset\md\addRes.png)

#### 6. Recommend button

When processing the search results, I create create a “Recommend” button for each result that, when clicked, sends an AJAX POST request to the REST API done in task 3. This increments the results accordingly and would allow the user to recommend the POI for others to see.

![Search](asset\md\London1.png)
![Search](asset\md\London2.png)

#### Troubles Part B

As this is my first time using EJS for a project of this scale, I struggled setting up my components properly the first time, eventually learning that all pages can be embedded in the layout view. From there on I was able to successfully create the views and have them flow into one another.

### Part C – Adding simple error-checking

#### 7. Error-checking

By making use of the required variable I can ensure that all fields of task 2s form are filled in by the user, ensuring that if any of the POI details are blank the appropriate message is sent back to the client. If something were to go wrong during the creation process I have made the system so that an alert displaying appropriate error code is returned in case of a problem with the creation call.

```JS
try {
    res.json(await pointsOfInterestPost.create(req.body));
} catch (err) {
    console.error(`Error while creating points of interest`, err.message);
    alert(err);
}
```

#### Troubles Part C

There were no real struggles with the error checking addition as I could simply require all inputs and try catch my ajax calls to output the relevant errors.

### Part D – Adding a map

#### 8. Leaflet Map

Using leaflet I was able to add an OpenStreetMap map to the page, which can be used accordingly. I the map to never render copies and to Show itself in its entirety upon mounting. Moreover, the popup functionality enables users to see lat and lng of the position they clicked on in a popup.

When searching for a region the map makes an ajax call and gathers all the data to loop through and add an markers dynamically on the map using a foreach method. This ensures that all relevant POIs are displayed and accessible to the user

```JS
const map = L.map("map").setView([40.505, -0.0], 2);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 18,
    minZoom: 2,
    attribution:
        "Map data &copy; " +
        '<a href="http://openstreetmap.org">OpenStreetMap</a>',
    id: "examples.map-i875mjb7",
    noWrap: true
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
popup
    .setLatLng(e.latlng)
    .setContent('Add map at ' + e.latlng.toString())
    .openOn(map);
}

map.on("click", onMapClick);
```

In addition to the map, whenever the search form is inputted with a valid value, the results are displayed as markers on the map. When clicked a on the point of interest name and description appear as a popup. This is accomplished by taking the Json data gotten from the Ajax call and looping through it with a foreach function, creating markers accordingly.

![Search](asset\md\Map.png)

At this point, having assembled all the basic functionality of my project, I opted to create a suitable and professional looking interface where all previous functionality would be combined into a singular coherent page. This page lays out the necessary features in a organized fashion.

![Search](asset\md\Home.png)

The Search functionality now displays the data as seen in tak 1 and 4 on the map and also in its own contained list on the right, with recommend functionality enabled for each.

#### 9. Add a POI on the map

When you click on the map at a particular location a popup opens prompting the user to enter the POI details. The form is identical to to the one in task 2 and 5 with the same error checking methods. Once the submit button is the data is sent over to your REST API and adds a new POI.

![Search](asset\md\HomeAdd.png)

#### Troubles Part D

I have had extensive previous experience dealing with Mapbox, another service that provides maps similar to  leaflet., meaning the gist was easy to comprehend and elaborate on. However I did initially struggle with correctly adding POI locations as I had too do extensive research on how to get the lan lng of a point once clicked. Eventually I discovered how to and could dynamically add them to the generated form application.

### Part E – logins and sessions

#### 10. Implement a session-based login system

For the login system I immediately made use of passport with mongoDB as opposed to the MySQL alternative stated here. This allowed me more control over the system as a whole and a more secure login system as a whole. Allowing users to access pages and requests only if they were authenticated on the system. From the login page users are able to input their email and password to access the system, however they can also sign up if need be in a secure way which would not compromise their credentials, as passwords are hashed and encrypted on creation.

Login
![Search](asset\md\Login.png)
Sign Up
![Search](asset\md\SignUp.png)

When a user logs in successfully, a message containing the users name appears to confirm that they have successfully signed into the application.

![Search](asset\md\Name.png)

#### 11. Ensure login enabled

Due to my use of passport for a login system I am able to make requests and pages only available to logged in users. This is done by adding the ensureAuthenticated parameter to my routes. A simple yet effective method that allows me to ensure only those people who have authenticated can access the Database

```JS
router.get('/region', ensureAuthenticated, (req, res) => res.render('pages/region'));
router.get('/add', ensureAuthenticated, (req, res) => res.render('pages/addPointsOfInterest'));
router.get('/map', ensureAuthenticated, (req, res) => res.render('pages/map'));
router.get('/review', ensureAuthenticated, (req, res) => res.render('pages/review'));
```

#### Troubles Part E

Ive used passport multiple times before so didn't struggle with its implementation, but did however have some trouble trying to implement it into the SQL database due to the user information. Hence i decided to let the system use mongoose to model a user object which was sent to a MongoDB server.

### Part F – Implementing a review system

#### 12. Review API

This allows clients to review a POI by reading in the POI ID POSTing data from the request body. It does this through a simple form and ensures that the review is not blank, only to be accessed when a user is logged in.

![Search](asset\md\Review.png)
![Search](asset\md\ReviewRes.png)

#### 13. Add a review box to the popup

As an extension on task a, whenever a user were to search a location and click on its corresponding popup, the system displays a review option beneath it. This allows the user to enter a review sending it along with the POI ID to the recently created review REST API.

![Search](asset\md\ReviewPopup.png)

#### Part F  Troubles

There were no troubles here as it was as simple as copying the POI adding request and amending the sql statement to add data to another table. Hence it worked as intended from the start

### Part G - Extension

- creating a well-structured Node application with models, controllers and routes and using ECMAScript 6 classes;
  - I have made use of all the above and more to ensure my program works as intended and is easily readable and understandable through OOD.
- using Passport for authentication rather than express-session;
  - From the start I made use of MongoDB and passport to make a secure login system that can be used for the system as appropriate
- creating a professional-looking site, including handling errors in a user-friendly, “real-world” way.
  - My site uses a modern and minimalist look designed to give a professional feeling throughout use
  - All my errors are presented in a user friendly way that does not take away from the site.
