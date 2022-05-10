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
var Chat = require('../models/chat.model');


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


//items tests
// test('./new item endpoint when no name provided response 400', () => {
//     request('http://localhost:4000').post('/new').send('incorrect value')
//     .expect(400)
//     .then((response) => {
//         console.log(JSON.parse(response.text).error);
//     }) // test should return error status 400
//     .catch((err) => console.log(err));
// });

test('random test', () => {
    var lmfao = 4;
    var haha = 4;
    expect(lmfao.toBe(haha));
})

// test('./new item should be added status 201', () => {
//     request('http://localhost:4000').post('/new').send(goodItem)
//     .expect(201)
// })

// test('./edit/:id check to see if error message', () => {
//     request('http://localhost:4000').put('./edit:id').send('21894720923')
//     .expect(400) // test should return error status 400
// });

// test('./:id check to see if error thrown when no id match', () => {
//     request('http://localhost:4000').get('/:id').send("fakeId")
//     .expect(400) // test should return error status 400
// });

// test('delete check to see if error thrown when no id match', () => {
//     request('http://localhost:4000').get('/delete/:id').send("fakeId")
//     .expect(400) // test should return error status 400
// });



