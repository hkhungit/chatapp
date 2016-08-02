Message.destroy_all
Chatroom.destroy_all
User.destroy_all

jim   = User.create({username: 'jim',   email: 'jim@fwz.com',   password: '123123'})
ben   = User.create({username: 'ben',   email: 'ben@fwz.com',   password: '123123'})
james = User.create({username: 'james', email: 'james@fwz.com', password: '123123'})
lily  = User.create({username: 'lily',  email: 'lily@fwz.com',  password: '123123'})

[jim, ben, james, lily].each do |user1|
  [jim, ben, james, lily].each do |user2|
    if user1 != user2
      chatroom = Chatroom.find_by_users([user1, user2])
      Message.create({user_id: user2.id, chatroom_id: chatroom.id,   content: "Hello #{user1.username}" })
    end
  end
end