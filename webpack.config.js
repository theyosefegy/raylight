const path = require("path");

module.exports = {
	entry: {
		index: path.resolve("src", "index.ts"),
		background: path.resolve("src", "background.ts"),
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: "[name].js",
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				use: "ts-loader",
				exclude: "/node_modules/",
			},
		],
	},
	resolve: {
		extensions: [".ts", ".js"],
	},
	mode: "production",
	watch: true, // Enables watch mode
};
