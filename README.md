# ListO
ListO is an auto-categorising smart to do list. Users enter a task, select a category, and using APIs, the task and corresponding info is added to the correct to do list.

## Project Setup

1. Clone this repository into an empty repo
2. Remove the git remote: `git remote rm origin`
3. Add a remote for your origin: `git remote add origin <your github repo URL>`
4. Push to the new origin: `git push -u origin master`

## Getting Started

1. Acquire API user keys (Yelp, GoodReads, tmdb)
2. Create the `.env` by using `.env.example` as a reference: `cp .env.example .env`
3. Update the .env file with your correct local information
4. Install dependencies
  `npm install`
5. Fix to binaries for sass: `npm rebuild node-sass`
6. Run migrations and seed data using npm 
  ```
  npm run knex migrate:latest
  npm run knex seed:run
  ```
7. Run the server: `npm run local` (port: 8080)

## Dependencies

- Node 5.10.x or above
- NPM 3.8.x or above
