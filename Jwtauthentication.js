const jwt = require("jsonwebtoken");

class Jwtauthentication {
  static secretKey = "mySk";
  constructor(id, username, isAdmin) {
    this.id = id;
    this.username = username;
    this.isAdmin = isAdmin;
  }

  static authenticate(id, username, isAdmin) {
    try {
      let payload = new Jwtauthentication(id, username, isAdmin);
      let token = jwt.sign(
        JSON.stringify(payload),
        Jwtauthentication.secretKey
      );
      return token;
    } catch (error) {
      throw error;
    }
  }
}
module.exports = Jwtauthentication;
