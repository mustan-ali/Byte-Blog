## Setting Up Environment Variables

1. In the `Backend` folder, create an `.env` file with the following content:

    ```env
    PORT=<backend-port>
    MONGO_URL=<database-connection-string>
    JWT_SECRET=<jwt-secret-key>
    FrontendURL=<react-frontend-url>
    ```

2. In the `Frontend` folder, create an `.env` file with the following content:

    ```env
    REACT_APP_BACKEND_URL=<backend-url>
    ```

## Running the Application

1. In the `Backend` folder, run the following commands:
    ```bash
    npm install
    ```
    ```bash
    node index.js
    ```
    
2. In the `Frontend` folder, run the following commands:
    ```bash
    npm install
    ```
    ```bash
    npm start
    ```
