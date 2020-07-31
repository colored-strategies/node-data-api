# Node Data API

Node.js data api

Add **MONGO_URI** variable to your **.env** file with the following key.  
Ex: "mongodb://**username**:**pass**@mongo.coloredstrategies.com/goyaMongo?retryWrites=true&w=majority"

## API Params

API serves over GET methods. Additional routing may be added as desired.

**/api/data/findBread** **-->** return all the breads  
**/api/data/\***?draw=3&start=1&length=1\* **-->** return with given limits
