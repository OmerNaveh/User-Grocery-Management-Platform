const express = require("express");
const path = require("path");
const compression = require("compression");
const app = express();

app.use(compression());
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
