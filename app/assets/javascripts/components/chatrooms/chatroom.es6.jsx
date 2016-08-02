const { Component }     = React

class Chatroom extends Component {
  constructor(props){
    super(props)
    this.state = {
      chatroom: null
    }
  }

  componentWillMount() {
    const { chatroom, messages } = this.props 
    if (chatroom)
      this.setWebsocket(chatroom.id)
    this.setDataChatroom(chatroom, messages)
  }

  componentWillReceiveProps(props) {
    const { chatroom } = props 
    this.setDataChatroom(chatroom, messages)
  }

  setWebsocket(id){
    let el = this
    if (App.cable) {
      App.user_channel = App.cable.subscriptions.create({channel: 'ChatroomChannel', chatroom_id: id},{
        fetch_chatroom: (room_id)=> {
          this.perform('fetch_chatroom', room_id)
        },

        received: (data)=> {
          if (data.operation === 'new_message') {
            let { messages } = el.refs.messages.state
            let message = data.data
            messages[message.id]  = message
            el.refs.messages.setState({
              messages: messages
            })

            el.setMessageScroll(message.chatroom_id)
          }
        },
      })
    }
  }

  setMessageScroll(chatroom_id){
    setTimeout(()=> {
      let chatroom = $('.chatroom-' + chatroom_id)
      chatroom.find('.content').val('')
      chatroom.find('.messages').scrollTop(chatroom.find('.messages-inner').outerHeight())
    }, 100)
  }

  setDataChatroom(chatroom, messages){
    if (chatroom) {
      this.setState({
        chatroom: chatroom
      })

      if (messages && this.refs.messages)
        this.refs.messages.setMessages(messages)
      this.setMessageScroll(chatroom.id)
    } 
  }

  render (){
    const { chatroom } = this.state
    const { messages } = this.props

    return (
      <div className={'chatroom chatroom-' + chatroom.id}>
        {chatroom && <div className='user-info'>Chat: {chatroom.name}</div>}
        {chatroom && <Messages messages={messages} key={'messages' + chatroom.id} ref='messages' />}
        {chatroom && <ChatForm key={'chatform' + chatroom.id} chatroom={chatroom} ref='chatform' />}
      </div>
    )
  }
}