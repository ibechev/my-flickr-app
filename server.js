/* eslint-disable no-console */
const express = require("express");
const history = require("connect-history-api-fallback");

const app = express();
const port = process.env.PORT || 3000;

app.use(
    history({
        index: "index.html",
        verbose: true,
    })
);

app.use(express.static("dist"));

app.listen(port, err => {
    if (err) {
        console.log(err);
    } else {
        console.log(`The server is listening at http://localhost:${port}`);
    }
});
