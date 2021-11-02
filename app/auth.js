const jwt = require('jsonwebtoken');

const checkToken = (req, res, next, requiredRole) => {
    let token = null;
    if (req.headers['authorization']) {
        let splitToken = req.headers['authorization'].split(' ');
        if (splitToken.length === 2) {
            token = splitToken[1];
            console.log(token);
        }
    }

    if (token) {
        try {
            let userToken = jwt.verify(token, process.env.PRIVATE_KEY);
            if (requiredRole === 'user' ||
                userToken.role === 'admin' ||
                (req.path.startsWith('/users') && req.params.id === userToken._id) // perfil del propio usuario autenticado
            ) {
                req.token = decoded;
                next();
            } else {
                res.json({
                    message: 'user not authorized'
                }, 403);
            }
        } catch (error) {
            res.json({
                message: 'user not authenticated'
            }, 401);
        }
    } else {
        res.json({
            message: 'user not authenticated'
        }, 401);
    }
}

const checkUser = (req, res, next) => {
    checkToken(req, res, next, 'user');
};

const checkAdminOrOwn = (req, res, next) => {
    checkToken(req, res, next, 'admin');
}

module.exports = {
    checkUser,
    checkAdminOrOwn
};