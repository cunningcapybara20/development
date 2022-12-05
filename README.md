# Development

### Link to Deployed Website
If you used the stencil code, this is https://cunningcapybara20.github.io/development/

### Goal and Value of the Application
The goal of this project was to expand upon our studio in react and create a bakery webpage where a customer can order their favorites pastries into their cart. On this page, they will be able to sort by price, and filter by whether they are tasty or round. This application is valuable because the user can narrow down their search for a pastry and determine what they want based on the information available.   

### Usability Principles Considered
Some of the usability principles I considered were putting a border around each item to allow for easier visual separation. I also decided that it would be best to have the cart along the bottom, similar to many popular online sites which would allow for easy user experience. I also added a visually responsive piece to the buttons so that the user would know that something happens upon clicking. 

### Organization of Components
I used just the one component of the BakeryItem, which has all of the item's information in it. All of the filter and sorting functions are in App.js. and I mapped the data from the json to the each BakeryItem component for all of the individual information.

### How Data is Passed Down Through Components
The data is in a json that contains all of the item information and I mapped this to BakeryItem components and used the KV pair as props. 

### How the User Triggers State Changes
I have state variables that change the page with different interactions. When a button is clicked, it would call a function to update the page in one way or another. For example, with the sort button, it would call the functions that dictates how the state variable for the BakeryItmes would change. 
