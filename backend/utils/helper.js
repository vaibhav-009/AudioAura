const jwt = require("jsonwebtoken");

getToken = async(email,user) =>{

    const token = jwt.sign({identifier : user.__id},"ThisIsOurKey");
    return token;
}

module.exports = getToken;