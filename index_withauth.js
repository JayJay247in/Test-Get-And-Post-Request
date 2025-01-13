const express = require('express');
const routes = require('./routes/users.js');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const { users } = require('./utils');

const app = express();
const PORT = 5000;

// Initialize session middleware with options
app.use(session({ secret: "fingerpint", resave: true, saveUninitialized: true }));

// Middleware for user authentication
app.use("/user", (req, res, next) => {
    // Check if user is authenticated
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']; // Access Token
        
        // Verify JWT token for user authentication
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user; // Set authenticated user data on the request object
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" }); // Return error if token verification fails
            }
        });
        
        // Return error if no access token is found in the session
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

// Parse JSON request bodies
app.use(express.json());

// User routes
app.use("/user", routes);

// Login endpoint
app.post("/login", (req, res) => {
    const user = req.body.user;
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 });

    // Store access token in session
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Endpoint for Getting all users with specific Last name
app.get("/users/lastname/:lastName", (req,res) => {
    const lastName = req.params.lastName;
    const usersWithLastName = users.filter(user => user.lastName === lastName)
    return res.status(200).json(usersWithLastName);
})
// Endpoint for Sorting Users by Date of birth
app.get("/users/sortbydob", (req,res) => {
    const sortedUsers = [...users].sort((a,b)=> new Date(a.dateOfBirth) - new Date(b.dateOfBirth))
    return res.status(200).json(sortedUsers);
})
// Start server
app.listen(PORT, () => console.log("Server is running at port " + PORT));