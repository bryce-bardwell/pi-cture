# pi-cture
A service allowing pi-ctures to be drawn on an LED matrix

## Running the app
You'll need to have an LED matrix setup and wired to the Raspberry Pi, I found this tutorial helpful: https://www.youtube.com/watch?v=g7Zrnr4kGw8

- On the Pi, clone the repository
- Run `npm run install:all` to install the frontend and backend dependencies
- Run `npm run start` to run the front and backends simultaneously
  
The app is made with Vite so for local development you can find the frontend route in the terminal output

## Sending a Request
- From the frontend, draw a picture and press 'Submit'
- This will send a request to the backend (you'll need a `.env` file with the correct `API_PATH` for the request)
- See the pretty picture on the Pi!

![6FBD2211-B20D-4B64-81E4-2DB5E463D809_1_201_a](https://github.com/user-attachments/assets/c367d904-956a-4aea-9f1e-16d136f61a25)
