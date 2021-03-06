'use strict';

const auth   = require('basic-auth');
const bcrypt = require('bcryptjs');
const User   = require("./models").User;

function Unauthorized(res) {
    res.status(401).json({
        message: 'Unauthorized!',
    });
}

module.exports = function(req, res, next){
    let data = auth(req);

    if (typeof data == 'undefined')
        return Unauthorized(res);

    User.findOne({
        emailAddress : data.name
    }).exec(
        (err, result) => {
            if (err) return next(err);
            
            if (!result)
                return Unauthorized(res);

            bcrypt.compare(data.pass, result.password, (err, isauth) => {
                if (!err && isauth) {
                    req.user = result;
                    return next();
                }

                return Unauthorized(res);
            });
        }
    );	
};