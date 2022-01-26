exports.config = {
  allScriptsTimeout: 11000,

  specs: ["*.js"],

  capabilities: {
    browserName: "chrome",
  },

  baseUrl: "http://172.31.90.113:8000/app/",

  framework: "jasmine",

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  },
};
