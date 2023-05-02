const app = require("./app.js");
const { connectDatabase } = require("./config/database.js");
const cloudinary = require("cloudinary");

// Config
if (process.env.NODE_ENV !== "production") {
	require("dotenv").config({ path: "config/config.env" });
}

connectDatabase();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Deployment
if (process.env.NODE_ENV === "production") {
	const path = require("path");
	const __dirname1 = path.resolve();

	app.get("/", (req, res) => {
		app.use(express.static(path.join(__dirname1, "../client/build")));
		res.sendFile(path.join(__dirname1, "../client/build/index.html"));
	});
}

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port ${process.env.PORT}`);
});
