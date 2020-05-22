#Aggregator4j editor
This project aims at facilitating the edition and test of an Aggregator4j configuration file
Features: 
* Upload your project Jar file
* Create new configuration through project 
* Test your classes in the project
* Autocomplete the edition  
##How to start
###Build
mvn clean install
###Start backend
Run this springboot class file : ``lu.jpingus.aggregator4jeditor.backend.BackendApplication`` from backend module 

###Start frontend
go to ``frontend/src/main/angular`` there do
```
npm install
npm start
```