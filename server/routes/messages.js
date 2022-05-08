const User = require('../models/user.model');
const Message = require('../models/message.model')

function messages(io){

    const messages = io.of('/api/messages');
    
    messages.on('connection', socket => {

        socket.on('clear-unread', data => {
            const { id, username } = data;
            User.findOne({username:username}).then( user => {
                let unread = [...user.unread].filter(element => ![id].includes(element));
                User.findOneAndUpdate({username:username},{unread:unread}).then( res => {
                    socket.broadcast.emit('unread')

                })
            })
        })

        socket.on('send-message', data => {
            const {sender, receiver , message, attachment, id} = data;

            try{
                Message.findById({_id:id}).then( out => {
                    let newMessage; try{ newMessage = [...out.messages, {sender, message, attachment}]}catch{newMessage = [{sender, message, attachment}]}
                    Message.findOneAndUpdate({_id:id},{messages:newMessage}).then( out => {
                        User.findOne({username:receiver}).then( user => {
                            let unread = [...user.unread, id];
                            User.findOneAndUpdate({username:receiver},{unread:unread}).then( res => {
                                socket.broadcast.emit('unread');
                                messages.in(id).emit('receive-message',id)
                            })
                        })
                    })
                })

            }catch{

            }
        });

        socket.on('join-room', id => {
            socket.join(id)

        });

        socket.on('get-open', users => {
            try{
                Message.findOne({users:users}, {users:1})
                .then(message => {
                    if(!message){
                        Message.findOne({users:users.reverse()}, {users:1}).then( message => {
                            if(!message){
                                _messageNaviagate(users)
                            }else{
                                socket.emit('message-navigate', message._id)
                            }
                        })
                    }else{
                        socket.emit('message-navigate', message._id)
                    }
                })
            }catch{

            }
            
        })

        socket.on('load', id => {
            try{
                Message.findById({_id:id}).then( value => socket.emit('allMessages', value) );

            }catch{

            }
            

        })

        const _messageNaviagate = (users) => { 
            try{
                const message = new Message({users:users })
                message.save().then(out => {
                    users.map( user => {
                        User.findOneAndUpdate(
                            {username:user},
                            {$addToSet: {chats:message}}
                        ).exec();
    
                    })
                    socket.emit('message-navigate', out._id)
                })
                
            }catch{

            }
        }

    })

}





module.exports = messages


