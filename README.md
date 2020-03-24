 # Messenger
## Features
React application with that fetches conversations from api with an provided access token and a date range and then displays information about it. Currently any string will do for a token but date range must be valid.

 - Data
   - Three info boxes  
     - `total_conversation_count`
     - `total_user_message_count` 
     - `total_visitor_message_count`
   - Table row with pagination showing 5 items
     -  `conversation_count`
     - `missed_chat_count`
     - `visitors_with_conversation_count`.

App uses:
 - React
 - Express
 - PostgreSQL
 - Docker

## Screenshot
![](/screenshot.png)

## Running the application
Docker-compose and docker is required for running the application.

Run in root folder:
`docker-compose up`

App will be available on port 80 at localhost.

### Featuring
- [x] React
- [x] Submitted data is stored in localstorage
- [x] Typescript
- [x] Line graphs based on table data.
- [x] Docker
