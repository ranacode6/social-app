const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

// Using Middlewares
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Importing Routes
const post = require("./routes/post");
const user = require("./routes/user");

// Deployment
if (process.env.NODE_ENV === "production") {
	const path = require("path");
	const __dirname1 = path.resolve();

	app.get("/", (req, res) => {
		app.use(express.static(path.join(__dirname1, "../client/build")));
		res.sendFile(path.join(__dirname1, "../client/build/index.html"));
	});
}
// Using Routes
app.use("/api/v1", post);
app.use("/api/v1", user);

module.exports = app;
