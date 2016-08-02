const { Component }     = React

class ChatBar extends Component {
  constructor(props){
    super(props)
    this.state = {
      chatrooms: null,
    }
    this.setWebsocket()
  }

  componentWillMount() {
    const { chatrooms } = this.props
    if (chatrooms)
      this.setState({
        chatrooms: chatrooms
      })
  }

  componentWillReceiveProps(props) {
    const { chatrooms } = props
    if (chatrooms)
      this.setState({
        chatrooms: chatrooms
      })
  }

  setWebsocket(){
    if (App.cable) {
      App.user_channel = App.cable.subscriptions.create({channel: 'UserChannel'},{
        fetch_chatroom: (room_id)=> {
          this.perform('fetch_chatroom', room_id)
        },

        received: (data)=> {
          debugger
        },
      })
    }
  }

  renderContent (chatrooms){
    let el = this
    return chatrooms.map((chatroom) => {
      return <Chatroom key={chatroom.id} chatroom={chatroom} messages={chatroom.messages} />
    })
  }

  render (){
    const { chatrooms } = this.state
    let renderContent
    if(chatrooms)
      renderContent  =  this.renderContent(chatrooms)

    return (
      <div className='list-group-chatroom'>
        {renderContent}
      </div>
    )
  }
}