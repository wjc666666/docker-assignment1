## Docker Assignment - Agile Software Practice.

__Name:__ JunchengWang

__Demo:__ .... The link to your YouTube demonstration ....

Overview
This multi-container application includes:

Movies API: An API that returns information about movies stored in a MongoDB database.
MongoDB: A NoSQL database used to store movie information.
Redis: An in-memory data structure store used for caching API responses and rate-limiting requests.
Mongo Express: A web-based MongoDB administrative interface, accessible only in the development environment.
Application Architecture
Movies API interacts with MongoDB to retrieve movie data.
Redis is used to cache responses from the Movies API to improve performance and handle rate limiting.
Mongo Express is provided as a MongoDB GUI for development purposes but is excluded from the production stack for security reasons.
![](./images/arch.png)

### Database Seeding.

Database Seeding
The database seeding process is automated using a mongo-seed service in the docker-compose.yml file. This service uses a JavaScript script (seedDatabase.js) along with a JSON file (seeding.json) to populate the MongoDB database with initial data. This configuration is only activated in the development environment to avoid unintended data changes in production.

How it works:

mongo-seed waits for the MongoDB service to be ready.
Once MongoDB is available, mongo-seed runs seedDatabase.js, which:
Connects to MongoDB using the provided credentials and URI.
Clears existing data from the movies collection.
Inserts the initial seed data from seeding.json.
After seeding, the mongo-seed container stops automatically.
Multi-Stack Environment
This project supports both development and production stack configurations using Docker Compose profiles. This allows you to run different services and settings depending on the environment.

Development Stack:
Includes the mongo-express service for easy database management and debugging.
The database is seeded automatically when the stack starts.
To start in development mode, use
docker-compose up --build
Environment Variables
The application requires the following environment variables to configure database connections and service behavior:

Movies API:

MONGODB_URI: MongoDB connection string (e.g., mongodb://USERNAME:PASSWORD@mongodb:27017).
REDIS_URI: Redis connection string (e.g., redis://redis).
ENABLE_WRITING_HANDLERS: Set to false to disable unwanted writing operations.
MongoDB:

MONGO_INITDB_ROOT_USERNAME: MongoDB root username.
MONGO_INITDB_ROOT_PASSWORD: MongoDB root password.
Mongo Express (Development only):

ME_CONFIG_MONGODB_ADMINUSERNAME: MongoDB admin username.
ME_CONFIG_MONGODB_ADMINPASSWORD: MongoDB admin password.
ME_CONFIG_MONGODB_SERVER: MongoDB server hostname (e.g., mongodb).
### Multi-Stack.

How to Run:


+ Set up a .env file in the root directory with the necessary environment variables, using the keys listed in the "Environment Variables" section.

+ To start in development mode with database seeding and Mongo Express enabled:

+ docker-compose --profile dev up --build
To start in production mode without Mongo Express and database seeding:

+ docker-compose up --build
Access the services:

Movies API: http://localhost:9000
Mongo Express (Development only): http://localhost:8080
