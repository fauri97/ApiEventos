const axios = require ('axios');
const userController = require('../controllers/userController');
const crypto = require('crypto');

const generate = function(){
    return crypto.randomBytes(20).toString('hex');
};

const request = function(url, method, data){
    return axios({url: url, method: method, data});
};

test('Should create and delete user', async function(){
    const email = generate();
    const password = generate();
    const name = generate();
    const response = await request('http://localhost:8080/user','post', 
    {name: name,email: email, password: password});

    expect(201).toBe(response.status);

    await userController.deleteUserByID(response.data.id);
});

test('Should create, login and delete user', async function(){
    const email = generate();
    const password = generate();
    const name = generate();
    const user = await userController.saveUser({name: name, email: email, password: password});

    const response = await request('http://localhost:8080/user/login','post',
    {email: email, password: password});

    expect(201).toBe(response.status);

    await userController.deleteUserByID(user.id);
});

test('Should get a user',async function(){
    const email = generate();
    const password = generate();
    const name = generate();
    const user = await userController.saveUser({name: name, email: email, password: password});

    const user1 = await userController.getUserById(user.id)

    expect(user1.id).toBe(user.id)
    expect(user1.email).toBe(user.email)

    await userController.deleteUserByID(user.id);
});

test('Should update a user', async function(){
    const email = generate();
    const password = generate();
    const name = generate();
    const user = await userController.saveUser({name: name, email: email, password: password});

    const changedEmail = generate();

    await userController.updateUser(user.id, {email: changedEmail})

    const user1 = await userController.getUserById(user.id)
    expect(user1.email).toBe(changedEmail)

    await userController.deleteUserByID(user.id);
});