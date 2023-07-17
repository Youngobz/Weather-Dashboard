#Weather Dashboard
This is a simple weather dashboard application that allows users to search for weather details of different cities. It fetches weather data from the OpenWeatherMap API and displays the current weather and a 5-day forecast for the selected city.

##Code Explanation
The code consists of HTML, CSS, and JavaScript files that work together to create the weather dashboard application.

##HTML Structure
The HTML structure defines the layout and elements of the weather dashboard. It consists of a header, a section for displaying weather details, and a search container.

The header contains the title of the dashboard.
The search container includes a form with an input field and a search button for users to enter and submit a city name.
The section for displaying weather details contains two main elements: current-date-details and card-view-details. The current-date-details element displays the current weather details for the selected city, while the card-view-details element displays a 5-day forecast with individual cards for each day.

##JavaScript (script.js)
The JavaScript code contains the logic and functionality of the weather dashboard.

Global Variables: It defines global variables that store API URLs, API keys, and DOM elements used in the code.
getWeatherData(searchedCity): This asynchronous function fetches weather data for a searched city using the OpenWeatherMap API. It makes two API calls: one to retrieve the coordinates of the city, and another to fetch the weather data using the obtained coordinates. The retrieved weather data is then formatted and stored in localStorage.
onSearchSubmitted(event): This function is called when the search form is submitted. It prevents the default form submission behavior, retrieves the value entered in the search input field, and calls the getWeatherData() function with the entered city name.
formatData(data): This function formats the retrieved weather data by extracting relevant information and storing it in an array of objects.
dateFormation(date): This function formats a date string obtained from the weather data into the desired format (MM/DD/YYYY).
setCityDataInLS(cityName, data): This function stores the weather data of a city in the localStorage, using the city name as the key and the data as the value.
getCityDataInLS(cityName): This function retrieves the weather data for a city from the localStorage based on the provided city name.
setListOfCity(searchedCityName=''): This function updates the list of searched cities in localStorage and renders the list in the UI. It is called whenever a new city is searched.
renderWeatherDetails(weatherData = []): This function renders the weather details on the page by updating the current weather section and the 5-day forecast section.
renderCurrentDateDetails(todaysData): This function updates the current weather section with the relevant data for the selected city.
renderCardDetails(weatherData): This function updates the 5-day forecast section by populating the individual cards with weather data.
renderListOfCities(cityList = []): This function renders the list of searched cities in the UI by creating <li> elements and attaching click event listeners to each item to allow users to view the weather details of a specific city.
renderCityData(cityName): This function is called when a searched city is clicked from the list. It retrieves the weather data for the selected city from localStorage and updates the UI accordingly.
initializePage(): This function initializes the weather dashboard by loading the list of previously searched cities and rendering the appropriate weather details if available.

##CSS (styles.css)
The CSS file contains the styles that define the appearance and layout of the weather dashboard elements. It uses various selectors and properties to customize the look and feel of the header, search container, weather details section, and individual cards.

#Getting Started
To run the application, follow these steps:

Open the following URL in a web browser : .
Enter the name of a city in the search input field and click the "Search" button to view the weather details.
Note: The application requires an internet connection to fetch weather data from the OpenWeatherMap API.

_Please note that the provided code is a simplified version and may not include all possible error handling and edge cases. It serves as a starting point and can be further enhanced and modified based on specific requirements._
