# FaceDetectionApp

This application analyses face images and classifies into three categories, age by group, gender and ethnicity. 

## Prerequisites

First install Node.js in to your local system with command:

```sh
sudo apt install nodejs
```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/akahardzzz0011/FaceDetectionApp.git
   ```
2. Install node modules into `./server`
   ```sh
   npm install
   ```
3. Install node modules to client in `./client`
   ```sh
    npm install
    ```
4. Set environment variables in `./client/.env.local`
   ```sh
   REACT_APP_SERVER_HOST_ADDRESS="http://localhost:3003/"
   ```
5. Run server in `./server`
   ```sh
   npm start
   ```
6. Run client in `./client`
   ```sh
    npm start
