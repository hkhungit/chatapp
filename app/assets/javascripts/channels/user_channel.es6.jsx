App.user_channel = App.cable.subscriptions.create({channel: 'UserChannel'},{
  fetch_chatroom: (room_id)=> {
    this.perform('fetch_chatroom', room_id)
  },

  received: (data)=> {
    
  },
})