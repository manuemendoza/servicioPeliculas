const User = require('./model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const getUsers = async(req, res) => {
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
};

const getUser = async(req, res) => res.json({
    movie: await User.findById(req.params.id)
});

const createUser = async(req, res) => {
    const salt = bcrypt.genSaltSync(15);
    const user = new User(req.body);
    user.token = null
    if (!req.body.password) {
        res.json({
            message: 'Password is required'
        }, 400);
    } else {
        const hash = bcrypt.hashSync(req.body.password, salt);
        user.password = hash;
        try {
            await user.save();
            res.json(user);
        } catch (error) {
            console.error(error);
            res.json({
                message: error.message
            }, 400);
        }
    }

};

const loginUser = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        res.json({
            message: "El usuario o cantraseña no son correctos"
        }, 400);
    } else {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.json({
                message: "El usuario o cantraseña no son correctos"
            }, 400);
        } else {
            try {
                const validated = bcrypt.compareSync(req.body.password, user.password);
                if (validated) {
                    const token = jwt.sign({
                        _id: user._id,
                        email: user.email
                    }, process.env.PRIVATE_KEY, {
                        expiresIn: '1h'
                    });
                    res.json(token);
                } else {
                    res.json({
                        message: "El usuario o cantraseña no son correctos"
                    }, 400);
                }
            } catch (error) {
                console.error(error);
                res.json({
                    message: error.message
                }, 400);
            }
        }
    }
}

const updateUser = async(req, res) => {
    let data = req.body;
    delete data.token;
    const user = await User.findByIdAndUpdate(req.params.id, data);
    res.json({
        user: await User.findById(req.params.id)
    });
};

const deleteUser = async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.json({
        delete: user
    });
};



module.exports = {
    getUser,
    getUsers,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
};