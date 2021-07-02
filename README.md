# express4.17.1-in-docker
EXPRESS 4.17 SPA

IMPORTANT NOTES:

    1. Make sure you follow the steps mentioned under "PROJECT START STEPS" and ensure that the steps execute successfully. 
    2. Make sure you follow the steps mentioned under "DOCKER START STEPS" and ensure that the steps execute successfully. 

PROJECT START STEPS:

    Pre-requisites:
    1. Install node, npm
    2. Install express (npm install express --save)

    Steps:
    1. To run this application, do the following:
        1.a. Go to the project root directory.
        1.b. Run the following commands respectively in the terminal/command line to build and run the app:
            - npm install
            - npm start
    
    2. Go to http://localhost:8080 in your browser to view it.
    
    CLOUD-IDE SETUP STEPS(follow the below steps in case you are using the Cloud IDE instead of your Local IDE):
	1. Please run the below commands from the project root to setup MySQL and MongoDB in this workspace:
	    - chmod 0755 ./database-setup.sh
	    - sh ./database-setup.sh
