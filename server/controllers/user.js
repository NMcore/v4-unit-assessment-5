const bcrypt = require('bcryptjs');

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body;
        const profile_pic = `https://robohash.org/${username}.png`;
        const db = req.app.get('db');
        const result = await db.user.find_user_by_username([username]);
        const existingUser = result[0];
        if (existingUser) {
            return res.status(409).send('Username Taken, do not pass go.')
        };
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const registeredUser = await db.user.create_user([username, hash, profile_pic]);
        const user = registeredUser[0];
        req.session.user = { username: user.username, id: user.id, profile_pic: user.profile_pic };
        res.status(201).send(req.session.user);
    },
    login: async (req, res) => {
        const { username, password } = req.body;
        const foundUser = await req.app.get('db').user.find_user_by_username([username]);
        const user = foundUser[0];
        if (!user) {
            return (res.status(401).send('Sorry there, your Username / Password is incorrect'))
        };

        const isAuthenticated = bcrypt.compareSync(password, user.password);
        if (!isAuthenticated) {
            return ('User or Password not correct, sorry about that')
        };
        delete user.password;
        req.session.user = { username: user.username, id: user.id, profile_pic: user.profile_pic };
        res.status(200).send(req.session.user);
    },
    logout: async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: async (req, res) => {
        if (!req.session.user) {
            return res.sendStatus(404);
        }
        res.status(200).send(req.session.user);
    }
}