const { Component }     = React

class ChatroomsList extends Component {
  renderChatroom(id){
    
  }

  renderContent (chatrooms){
    let el = this
    return chatrooms.map((chatroom) => {
      return <RoomItem renderChatroom={(id) => this.renderChatroom(id)} key={chatroom.id} chatroom={chatroom} />
    })
  }

  render (){
    const { chatrooms } = this.props
    let renderContent
    if(chatrooms)
      renderContent  =  this.renderContent(chatrooms)

    return (
      <div className='list-group'>
        {renderContent}
      </div>
    )
  }
}