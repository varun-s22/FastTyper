# FastTyper

FastTyper is a multi-player speed typing game, where users type a paragraph or text, and are ranked according to their WPM (Word Per Minute).

## Setup

Since we are using React for front-end, and Express, PostGreSQL, WebSockets in the back-end. One has to setup 2 servers locally. Follow these steps to set up:

- Get the files either from `git clone` or manually downloading files

### Front-End

<br>

- For Front End, go to `/front-end` directory, and run `npm install`, to download all the local dependencies, on your local machine.

- Create a `.env` file in the same directory. It should look like this:

        REACT_APP_HOST="" <insert your value here>
        CLIENT_SIDE="" <insert your value here>

  where `REACT_APP_HOST` is the link where your back-end server is hosted. For local development it can something like `"http://localhost:<express port number>"`

  and `CLIENT_SIDE` is the link for your client (front-end). For local development it can be something like `"http://localhost:<react port number>"`

- After setting up, run `npm start` to start the client server.

### Back-End

<br>

- Install <a href="https://www.postgresql.org/download/">PostgreSQL</a>
- Go to `/back-end` directory, and run `npm install` to download all the dependencies locally, on your machine.

- Create a `.env` file in the same directory, it should look something like this:

  ```
      PORT=<express port>
      CLIENT_ID=<google oauth client id>
      CLIENT_SECRET=<google oauth client secret>
      DB=<postgres db name>
      DB_USER=<postgres db username>
      DB_PASS=<postgres db password>
      SESSION_SECRET=<session secret>
      WEBSITE="<client-link>"
  ```

  where `WEBSITE` is the link for client side, for locally development, it can be something like `"http://localhost:<react port number>"`.

  For getting `CLIENT_ID` and `CLIENT_SECRET`, go <a href="https://console.cloud.google.com/">here</a>

- After installation, run `npm run dev` to start a local server.

Now you are good to go.

If you face any issues while setting up, feel free to contact me :)

NOTE - Currently its not hosted anywhere, so one has to set it up locally on their machine.
