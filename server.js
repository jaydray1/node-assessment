const express = require('express')
    , bodyParser = require('body-parser')
    , usersCtrl = require('./usersCtrl')

const app = express();
app.use(bodyParser.json());

app.get('/api/users', usersCtrl.getUsers);
app.get('/api/users/:userId', usersCtrl.getUserId);
app.get('/api/admins', usersCtrl.getAdmins);
app.get('/api/nonadmins', usersCtrl.getNonAdmins);
app.get('/api/user_type/:user', usersCtrl.getUserType);
app.put('/api/users/:id', usersCtrl.updateUserId);
app.post('/api/users', usersCtrl.addUser);
app.delete('/api/users/:id', usersCtrl.removeUser);

const port = 3000;
app.listen(port, () => console.log('Listening on port:', port));