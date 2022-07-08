const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const swaggerJsDoc  = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(express.json());

//config swagger
const options = {
    definition: {
        openapi: "3.0.3",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API"
        },
        servers: [
            {
                url: "http://localhost:8080"
            }
        ],
    },
    apis: ["./routes/*.js"]
}

const swaggerDocs = swaggerJsDoc(options);
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDocs));
//config env
dotenv.config();

//database
mongoose.connect(process.env.DATABASE)
.then(()=>console.log('Connect database successfully'))

//router

const category = require('./routes/category');
const product = require('./routes/product');
app.use('/api',category)
app.use('/api',product)

//port
const port = process.env.PORT || 8000;
app.listen(port,()=> console.log("working on port: ",port))