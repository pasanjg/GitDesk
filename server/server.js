var url = require("url"),
  http = require("http"),
  https = require("https"),
  fs = require("fs"),
  qs = require("querystring"),
  express = require("express"),
  app = express();

function loadConfig() {
  var config = JSON.parse(fs.readFileSync(__dirname + "/config.json", "utf-8"));
  console.log("Configuration");
  for (var i in config) {
    var configItem = process.env[i.toUpperCase()] || config[i];
    if (typeof configItem === "string") {
      configItem = configItem.trim();
    }
    config[i] = configItem;
    if (i === "oauth_client_id" || i === "oauth_client_secret") {
      console.log(i + ":", config[i], true);
    } else {
      console.log(i + ":", config[i]);
    }
  }
  return config;
}

var config = loadConfig();

function authenticate(code, cb) {
  var data = qs.stringify({
    client_id: config.oauth_client_id,
    client_secret: config.oauth_client_secret,
    code: code,
  });

  var reqOptions = {
    host: config.oauth_host,
    port: config.oauth_port,
    path: config.oauth_path,
    method: config.oauth_method,
    headers: { "content-length": data.length },
  };

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

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/", function (req, res) {
  res.json({
    status: "GOOD",
    endpoint: "/authenticate/:code",
  });
});

app.get("/authenticate/:code", function (req, res) {
  console.log("authenticating code:", req.params.code, true);
  authenticate(req.params.code, function (err, token) {
    var result;
    if (err || !token) {
      result = { error: err || "bad_code" };
      console.log(result.error);
    } else {
      result = { token: token };
      console.log("token", result.token, true);
    }
    res.json(result);
  });
});

module.exports.config = config;
module.exports.app = app;
