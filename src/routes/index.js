module.exports = (express, app) => {
  const api_default = `/api`;
  const web_default = ``;

  require("./api/auth.routes")(express, app, api_default);
  require("./api/user.routes")(express, app, api_default);
  require("./api/marketplace.routes")(express, app, api_default);

};
