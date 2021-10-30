const User = require('./model.js');


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
    const user = new User(req.body);
    try {
        await user.save();
        res.json(user);
    } catch (error) {
        res.json(err => console.error('No se ha guardado en la base de dato', err))
    }

};

const updateUser = async(req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
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

// const postLoging = async(req, res) => {

// }


module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser,
};