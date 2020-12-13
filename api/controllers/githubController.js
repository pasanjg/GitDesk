const { authenticate } = require("../utils/utils");


exports.authenticate = (req, res) => {
	console.log(req.params.code);
	authenticate(req.params.code, function (err, token) {
		var result;
		if (err || !token) {
			result = { error: err || "bad_code" };
			console.log(result.error);
		} else {
			result = { token: token };
			console.log("token", result.token, true);
		}
		res.status(200).json(result);
	});
};


