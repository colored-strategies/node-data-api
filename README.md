# Node Data API

This API serves as a gateway for any project that uses CRUD operations over MongoDB. Datatables server-side requests and responses used for our testing purpose.    

## Running the API

API serves over http://localhost:3000/ by default. Following commands starts up the server.   
<code>npm run start</code> **OR** <code>yarn start</code>

## API Configuration

This API uses two environment variables. **MONGO_URI** used as a MongoDB connection string. **API_URL** used as a base for product thumb and full-size images.    

Add **MONGO_URI** & **API_URL** variables to your **.env** file by updating with your own keys.    
    
**MONGO_URI**="mongodb://**username**:**pass**@mongo.coloredstrategies.com/goyaMongo?retryWrites=true&w=majority"   
**API_URL**="https://node-api.coloredstrategies.com"    

## API Routing

API serves over GET, POST, PUT, DELETE methods. Additional routing may be added as desired.

**GET /products/seeder -->** Seed with the initial data   
**GET /products -->** Return all the products   
**POST /products/add -->** Create new product   
**PUT /products/update -->** Update given product's data    
**DELETE /products/delete -->** Delete the product/s with given id/s    
