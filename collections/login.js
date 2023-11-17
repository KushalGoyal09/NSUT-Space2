const User = require('../model/user');
const asyncWrapper = require('../middleware/async-wrapper')

const login = asyncWrapper(async (req, res) => {
    const { username, password } = req.body;
    const person = await User.findOne({ username });
    if (!person) {
        return res.status(404).json({ success: false, msg: `No user as ${username}`, userExist: false });
    }
    if (person.password !== password) {
        return res.status(401).json({ success: false, userExist: true, msg: `Password do not match` })
    }
    return res.status(200).json({ success: true, userExist: true, user: person });
})

module.exports = login;