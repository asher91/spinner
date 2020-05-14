# spinner
Spinwheel Demo

This is a ReactJS with a PHP backend, making use of Slim framework.
This application is made up of 3 sections:
1) The Spinning wheel: Used only as a display to attract the user and provide a visual outcome.  

2) The Input form: Provides the user the mean to register, login or place his bet, while displaying other information ie: Possible win, current balance etc. 

3) The PHP backend does most of the work:

    a. When the page is loads, the available sections of the spinning wheel is loaded (hardcoded for now but can be retrieved from DB to allow admin to create new spinning wheel or modify etc).
    
    b. When the user logs in or register the backend created a record in the user table keeping the user's name, email, password & balance.
    
    c. When the user places a bet, the bet if sent to the backend which generates the outcome randomly and forward the result to the front end, this preventing any risk of the user tampering with the JS to win.

4) Doker: The whole application has been setup to be containerized on Docker, you just have to build the docker image. 
5) Authentication: Done by comparing the hashed of the provided password to the Hash in the DB (pasword is not stored in clear text), if they both tally a then the users profile is in turn encrypted using a generated token and both are store in session storage.
6) Computation: The wheel spins for 6seconds though the outcome has already been calculated on the server and neceddary adjustments made with regards to the users' balance, only when the time is up will a message displayed to the user informing him of the outcome. 
7) Settings: The spinning wheel is filled with valued from the backend which is loaded on page load, this provide scope for future development in the event that we wish to provide the client (service provided) with a dashboard allowing them to create, update or delete wheel games.
8) Storage: A script to initialize the mysql database is included into the application, on first time run the DB will be created.  

