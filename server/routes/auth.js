
const express       = require('express');
const router        = express.Router();
const User          = require('../models/user.model');
const bcrypt        = require('bcrypt');
const passport      = require('passport');
const session       = require('express-session');
let message = '';



router.post('/', async(req, res) =>{
    if (req.session.user && req.cookies.user_sid) {
        res.json([true, req.session.user])
    } else {
        res.json([false, null])
    }
});

router.post('/register', async(request, response) =>{
    const {username, password} = request.body;

    const user = await User.exists({username:username});
    if (!user) {
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username:username,
            password: hashedPassword,
        });
        
        console.log(hashedPassword)
        newUser.save()
        .then((data) =>{
            request.session.user = username;
            response.json("successful");
        })
        .catch((error) =>{
            response.json(error);
        });
        
    } else {
        response.json("Error: User is already registered");
    }
    
});

router.get('/user', (req, res) => {
    const user = req.session.user;
    user ? res.json(user) : res.json(null)
})

router.post('/logout', (req, res) =>{
    req.session.destroy();
    res.json('Logged out')
})

router.post('/login',passport.authenticate('local', { failWithError: true }),
  function(req, res, next) {
    req.session.user = req.user.username;
    res.json('success');
  },
  function(err, req, res, next) {
    // handle error
    console.log(err);
    res.json(err);
  }
);

module.exports = router;