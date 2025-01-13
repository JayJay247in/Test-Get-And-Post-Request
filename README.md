# Node.js Express Authentication API

This project implements a basic authentication system using Node.js, Express.js, JSON Web Tokens (JWT), and express-session middleware. It demonstrates how to protect routes and manage user sessions.

## Features

*   **User Login:** `/login` endpoint for user authentication via POST request, which returns a JWT access token.
*   **Protected User Routes:** `/user` endpoint is protected by JWT authentication. All endpoints that starts with `/user` require a valid access token to be present in headers.
*   **JSON Web Tokens (JWT):** Uses JWT to generate access tokens for user authentication.
*   **Express Session:** Uses `express-session` to manage user sessions and store access tokens.
*  **User Creation/Update**: Uses `POST` request to `/user` to update or create new users
*  **Get All Users**: Uses `GET` request to `/user` to get all users
*  **Get User By ID**: Uses `GET` request to `/user/:id` to get a user by id

## Technologies Used

*   Node.js
*   Express.js
*   JSON Web Tokens (JWT)
*   express-session
*   body-parser (for parsing JSON request bodies)

## Getting Started

To run the server, follow these steps:

### Prerequisites

*   [Node.js](https://nodejs.org/) and npm (or yarn) installed on your system.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JayJay247in/Test-Get-And-Post-Request.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd mxpfu-nodejsLabs
    ```
3.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Server

1.  **Start the server:**
    ```bash
    npm run start_auth
    ```
    The server will output `Server is running at port 5000` to your console.

### Testing with Postman

You can use Postman to test the different endpoints by making the following requests.

**1. Login Endpoint (`/login`)**

*   **Method:** `POST`
*   **URL:** `https://cj193532-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/login` (replace with your URL)
*   **Headers:**
    *   `Content-Type`: `application/json`
*   **Body (JSON):**

    ```json
     {
       "user": "yourUsername"
     }
    ```
     Replace `yourUsername` with a user you want to login.
*   **Expected Response:**
    *   `200 OK` status code.
    *   Response body: `"User successfully logged in"`
     After a successful `login` you will get an access token which should be stored.

**2. Protected `/user` Endpoint (GET - All Users)**

*   **Method:** `GET`
*   **URL:** `https://cj193532-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/user` (replace with your URL)
*   **Headers:**
      * `Authorization`: `Bearer <your-access-token>`
         Replace `<your-access-token>` with the actual access token from the previous `/login` response
* **No Body:**
 * **Expected Response:**
       * Status code: `200 OK`
       * Response body: An array of user objects.

**3. Protected `/user/:id` Endpoint (GET - Specific User By ID)**

*   **Method:** `GET`
*   **URL:** `https://cj193532-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/user/1` (replace with your URL, and replace `1` with the user id that you want to fetch)
*   **Headers:**
     *  `Authorization`: `Bearer <your-access-token>`
        Replace `<your-access-token>` with the actual access token from the previous `/login` response
*  **No Body:**
*   **Expected Response:**
      * If the user is found:
          * Status code: `200 OK`
          * A single user object is returned in the response body.
     * If the user is not found with the specified id, a 404 error will be returned

**4. Protected `/user` Endpoint (POST - Create/Update user)**

* **Method**: `POST`
* **URL**:  `https://cj193532-5000.theianext-0-labs-prod-misc-tools-us-east-0.proxy.cognitiveclass.ai/user`
* **Headers**:
    *   `Content-Type`: `application/json`
    *  `Authorization`: `Bearer <your-access-token>`
      Replace `<your-access-token>` with the actual access token from the previous `/login` response
* **Body (JSON)**:
  ```json
   {
      "id": 3,
      "name": "testUser",
      "username": "testusername"
    }

This is an example to add a new user with the id `3`, `name` as `testUser` and username as `testusername`. This will also work for updating user information if you provide an existing id.

Expected Response:
* Status code: 200 OK or 201 Created, if the request was successful.
* The response body may return a JSON object of the created/updated resource, depending on your server.

Authentication Steps

First, you must get a valid access token by making a POST request to the /login endpoint by specifying the username in the request body. You need to provide "Content-Type": "application/json" as a header and also provide a JSON body with "user": "username" as value in the body.

Then, use the access token in the other requests (to /user endpoints) by using Authorization header, using Bearer schema as shown in the examples for each request.

Authorization:

All routes that start with /user require a valid access token in the headers. This can be set by using the header as Authorization: Bearer <access token>

Error Handling

If you send a request to the /user path without any authentication, you will get {"message": "User not logged in"}.

If the access token verification fails then you will get a 403 Forbidden status code and response body {"message": "User not authenticated"}

If the request is not valid, such as 400 Bad Request, ensure that you are providing the request body with correct format and fields.

If the user is not found with the specified id, a 404 error will be thrown.

Project Structure
index_withauth.js: Main server file.

./routes/users.js: Route for /user end point.

Author
Ikechukwu Faithful