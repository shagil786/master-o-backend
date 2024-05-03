const jwt = require("express-jwt");

function authJwt() {
  const secret = process.env.SECRET;
  const api = process.env.API_URL;
  return jwt
    .expressjwt({
      secret,
      algorithms: ["HS256"],
    })
    .unless({
      path: [
        `${api}/generate-numbers`,
        `${api}/calculate-winnings`,
        `${api}/user-points`,
        `${api}/update-points-on-loss`,
      ],
    });
}

module.exports = authJwt;
