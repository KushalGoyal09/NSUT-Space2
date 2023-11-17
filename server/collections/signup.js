const User = require('../model/user');
const asyncWrapper = require('../middleware/async-wrapper')

const signup = asyncWrapper(async (req, res) => {
    const { username, password, email } = req.body;
    const person = await User.create({ username, password, email });
    return res.status(200).json({ success: true, person })
})

module.exports = signup;