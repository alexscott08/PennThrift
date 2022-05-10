const request = require('supertest');

const webapp = require('../server');

//import routes
const itemRoutes = require('../routes/items');
const profileRoutes = require('../routes/profile');
const uploadRoutes = require('../routes/upload');
const authRoutes = require('../routes/auth');
const analyticsRoutes = require('../routes/analytics');


//import models
var Item = require('../models/item.model');
var Message = require('../models/message.model');
var Notification = require('../models/request.model');
var Review = require('../models/review.model');
var User = require('../models/user.model');
var Chat = require('../models/chats.model');


//test models
var badItem = new Item({
    name:"badItem"
});

var goodItem = new Item({
    name:"goodItem",
    description: "great description",
    image: "fake image",
    category: "clothing",
    price: 3, 
    to_sell: true,
    to_trade: false
});

var badMessage = new Message({
    attachment: true
});

var badNotification = new Notification({});

var badReview = new Review();

var badUser = new User();

var badChat = new Chat(); 


// items tests
test('./new item endpoint when no name provided response 400', () => {
    request('http://localhost:4000').post('/new').send('incorrect value')
    .then((response) => {
        expect(JSON.parse(response).error).toBe('username not provided')
    }) // test should return error status 400
    .catch((err) => console.log(err));
});




// test('./new item should be added status 201',async () => {
//     request('http://localhost:4000').post('/new').send(goodItem)
//     .expect(201)
//     .then((response) => {
//         console.log( JSON.parse(response.text).error);
//     }) // test should return error status 400
//     .catch((err) => console.log(err));
// })

// test('./edit/:id check to see if error message',async () => {
//     request('http://localhost:4000').put('./edit:id').send('21894720923')
//     .expect(400) // test should return error status 400
//     .then((response) => {
//         console.log( JSON.parse(response.text).error);
//     }) // test should return error status 400
//     .catch((err) => console.log(err));
// });

// test('./:id check to see if error thrown when no id match',async () => {
//     request('http://localhost:4000').get('/:id').send("fakeId")
//     .expect(400) // test should return error status 400
//     .then((response) => {
//         console.log( JSON.parse(response.text).error);
//     }) // test should return error status 400
//     .catch((err) => console.log(err));
// });

// test('delete check to see if error thrown when no id match',async () => {
//     request('http://localhost:4000').get('/delete/:id').send("fakeId")
//     .expect(400) // test should return error status 400
//     .then((response) => {
//         console.log( JSON.parse(response.text).error);
//     }) // test should return error status 400
//     .catch((err) => console.log(err));
// });

