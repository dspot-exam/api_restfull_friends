# Steps to run the project

1. Clone the project
2. Install the dependencies
3. Rename the .env.example file to .env and fill the values
4. Run the project `npm run start:dev`
5. Seed the database with profiles and connections

```bash
# Endpoints
http://localhost:<port>/api/v1/seed/profiles/<NUMBER_OF_PROFILES>
http://localhost:<port>/api/v1/seed/connections/<NUMBER_OF_CONNECTIONS>
```

# Documentation

Postman Collection at the root of the project
The documentation is also available at endpoint `/api-docs`

# Run tests

```bash
npm run test # unit tests
npm run test:e2e # e2e tests
```

# Considerations:

- Comment Seed module in the app.module.ts imports before building the project for production
- Build image with `docker compose up --build`
