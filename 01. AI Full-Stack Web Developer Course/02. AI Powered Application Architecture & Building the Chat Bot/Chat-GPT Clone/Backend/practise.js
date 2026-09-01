import express from "express";

const app = express();

// Request logging middleware
function logger(req, res, next) {
    const url = req.url;
    const method = req.method;
    console.log(url, method);
    next();
}

// Secondary logging middleware
function loggerSecond(req, res, next) {
    console.log('Second middleware');
    next();
}

// Global error-handling middleware
function errorHandler(err, req, res, next) {
    console.log(err.message);
    res.status(500).send('Internal Server Error');
}

// Register global middleware stack
app.use([logger, loggerSecond]);

// Home route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// About route (intentionally throws an error)
app.get('/about', (req, res) => {
    throw new Error('about error');
});

// API chat route
app.get('/api/chat', (req, res) => {
    res.send('Hello World! from chat route');
});

// API conversation route
app.get('/api/conversation', (req, res) => {
    res.send('Hello World! from conversation route');
});

// Register error-handling middleware at the very end of the stack
app.use(errorHandler);

// Start server on port 3888
app.listen(3888, () => {
    console.log("server is running on port http://localhost:3888");
});