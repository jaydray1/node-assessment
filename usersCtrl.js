const users = require('./userData.json');

module.exports = {
    getUsers: (req, res, next) => {
        const { age, lastname, email, favorites } = req.query;

        if(age) {
        const filteredAge = users.filter((e) => e.age < age);
        res.status(200).send(filteredAge);
        } else if(lastname) {
        const filteredAge = users.filter((e) => lastname === e.last_name);
        res.status(200).send(filteredAge);
        } else if(email) {
        const filteredEmail = users.filter((e) => email === e.email);
        res.status(200).send(filteredEmail)
        } else if(favorites) {
        let filteredFavorites = []
        for(var i = 0; i < users.length; i++) {
            if(users[i].favorites.indexOf(favorites) !== -1 ) {
                filteredFavorites.push(users[i])
            }
        }
        res.status(200).send(filteredFavorites)
        } else {
            res.status(200).send(users)
        }
    },
    getUserId: (req, res, next) => {
        const { userId } = req.params;
        const foundUser = users.filter((e) => e.id === parseInt(userId));
        if(foundUser) {
            res.status(200).json(foundUser[0])
        } else {
            res.status(404).json(null)
        }
    },
    getAdmins: (req, res, next) => {
        const {admin} = req.body;
        const newAdmins = users.filter((e) => e.type === 'admin');
        res.status(200).send(newAdmins);
    },
    getNonAdmins: (req, res, next) => {
        const {nonAdmins} = req.body;
        const nonAds = users.filter((e) => e.type !== 'admin');
        res.status(200).send(nonAds);
    },
    getUserType: (req, res, next) => {
        const newTypes = users.filter((e) => e.type === req.params.user);
        res.status(200).send(newTypes);
    },
    updateUserId: (req, res, next) => {
        for(var i = 0; i < users.length; i++) {
            if(req.params.id == users[i].id) {
                users.splice(i, 1, req.body)
            }
        }
        res.status(200).send(users)
    },
    addUser: (req, res, next) => {
        req.body.id = 
        users.push(req.body);
        res.status(200).send(users);
    },
    removeUser: (req, res, next) => {
        const {id} = req.params;
        users.splice(users.findIndex(i => i.id.toString() === id), 1)
        res.status(200).send(users);
    }
}

