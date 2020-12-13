const https = require("https");
const qs = require("querystring");

const appIsDev = () => {
	return process.env.REACT_APP_IS_DEV || false;
};

const getGitHubClientID = () => appIsDev() ? process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_ID : process.env.REACT_APP_GITHUB_OAUTH_PROD_CLIENT_ID;

const getGitHubClientSecret = () => appIsDev() ? process.env.REACT_APP_GITHUB_OAUTH_DEV_CLIENT_SECRET : process.env.REACT_APP_GITHUB_OAUTH_PROD_CLIENT_SECRET;

const authenticate = (code, cb) => {
	var data = qs.stringify({
		client_id: getGitHubClientID(),
		client_secret: getGitHubClientSecret(),
		code: code,
	});

	var reqOptions = {
		host: process.env.OAUTH_HOST,
		port: process.env.OAUTH_PORT,
		path: process.env.OAUTH_PATH,
		method: process.env.OAUTH_METHOD,
		headers: { "content-length": data.length },
	};

	console.log(reqOptions);

	var body = "";
	var req = https.request(reqOptions, function (res) {
		res.setEncoding("utf8");
		res.on("data", function (chunk) {
			body += chunk;
		});
		res.on("end", function () {
			cb(null, qs.parse(body).access_token);
		});
	});

	req.write(data);
	req.end();
	req.on("error", function (e) {
		cb(e.message);
	});
}

exports.appIsDev = appIsDev;
exports.getGitHubClientID = getGitHubClientID;
exports.getGitHubClientSecret = getGitHubClientSecret;
exports.authenticate = authenticate;