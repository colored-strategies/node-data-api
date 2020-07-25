# Node Data API
Node.js data api


Add **MONGO_URI** variable to your **.env** file with the following key.   
Ex: "mongodb+srv://**username**:**pass**@mycluster-sqpm0.mongodb.net/**DBNAME**?retryWrites=true&w=majority"


##  API Params

API serves over GET methods. Additional routing may be added as desired.

**/api/data/findBread** --> return all the breads   
**/api/data/**:draw/:startIndex/:length --> return with given limits    


