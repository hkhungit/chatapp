const { Component }     = React

class RoomItem extends Component {
  renderChatroom(id){
    const { renderChatroom } = this.props
    if (renderChatroom)
      renderChatroom(id)
  }

  render (){
    const { name, id } = this.props.chatroom

    return (
      <div className='list-group-item' onClick={() => this.renderChatroom(id)}>
        {name}
      </div>
    )
  }
}