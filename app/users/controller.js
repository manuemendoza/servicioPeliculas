const User = require('./model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const getUsers = async(req, res) => {
    try {
        if (req.query.name) {
            const users = await User.find({ name: { $regex: new RegExp(req.query.name, 'i') } });
            res.json({
                user: users
            });
        } else {
            res.json({
                users: await User.find()
            });
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};

const getUser = async(req, res) => {
    try {
        const movie = await User.findById(req.params.id)
        if (movie) {
            res.json(movie);
        } else {
            res.json({
                message: 'user not found'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
}

const createUser = async(req, res) => {
    if (!req.body.password) {
        res.json({
            message: 'password is required'
        }, 400);
    } else {
        let data = req.body;

        if (!req.token || req.token.role == 'user') {
            delete data.role;
        }

        const user = new User(req.body);

        const salt = bcrypt.genSaltSync(15);
        const hash = bcrypt.hashSync(req.body.password, salt);
        user.password = hash;

        try {
            await user.save();
            res.json(user);
        } catch (error) {
            console.error(error);
            if (error.message == "ValidationError") {
                res.json({
                    message: error.message
                }, 400);
            } else {
                res.json({
                    message: error.message
                }, 500);
            }
        }
    }

};

const loginUser = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            message: "invalid user or password"
        }, 400);
    } else {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.json({
                message: "invalid user or password"
            }, 400);
        } else {
            try {
                const validated = bcrypt.compareSync(req.body.password, user.password);
                if (validated) {
                    const token = jwt.sign({
                        _id: user._id,
                        role: user.role
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '4h'
                    });
                    res.json(token);
                } else {
                    res.json({
                        message: "invalid user or password"
                    }, 400);
                }
            } catch (error) {
                console.error(error);
                res.json({
                    message: error.message
                }, 500);
            }
        }
    }
}

const updateUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            let data = req.body;

            if (!req.token || req.token.role == 'user') {
                delete data.role;
            }

            if (req.body.password) {
                const salt = bcrypt.genSaltSync(15);
                const hash = bcrypt.hashSync(req.body.password, salt);
                data.password = hash;
            }

            const userUpdate = await User.findByIdAndUpdate(req.params.id, data, { new: true });
            res.json(userUpdate);
        } else {
            res.json({
                message: 'user not found'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        if (error.name == "ValidationError") {
            res.json({
                menssage: error.message
            }, 400);
        } else {
            res.json({
                message: error.message
            }, 500);
        }
    }
};

const deleteUser = async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            const userDelete = await User.findByIdAndDelete(req.params.id);
            res.json({
                message: 'user deleted'
            });
        } else {
            res.json({
                message: 'user not found'
            }, 404);
        }
    } catch (error) {
        console.error(error);
        res.json({
            message: error.message
        }, 500);
    }
};



module.exports = {
    getUser,
    getUsers,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
};