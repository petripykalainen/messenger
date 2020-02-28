 # Messenger
## Features
React application with that fetches conversations from api with an provided access token and a date range and then displays information about it.

 - Data
   - Three info boxes  
     - `total_conversation_count`
     - `total_user_message_count` 
     - `total_visitor_message_count`
   - Table row with pagination showing 5 items
     -  `conversation_count`
     - `missed_chat_count`
     - `visitors_with_conversation_count`.

## Running the application
App runs on a docker container so only building and running the image is required.

Run in root folder:
`docker build .`

Either give it a name with -t {name_here} or copy the id when build finishes.
`docker build -t messenger .`

Syntax;
`docker run -p {port_on_host}:80 {name | id}`

`docker run -p 80:80 messenger`
Now the docker container is running at port 80 on localhost.



### Featuring
- [x] React
- [x] Submitted data is stored in localstorage
- [x] Typescript
- [x] Line graphs based on table data.
- [x] Application running at Digital Ocean droplet [Right here](http://104.248.133.27/)
- [x] Docker contained
