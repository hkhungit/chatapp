const { Component }     = React

class ChatForm extends Component {
  render (){
    const { chatroom } = this.props

    return (
      <div className='chatform'>
        <form className="new-message" action="/messages" accept-charset="UTF-8" data-remote="true" method="post">
          <input type="text" name="message[content]" className={'content content-' + chatroom.id}/>
          <input type="hidden" name="message[chatroom_id]" className='chatroom_id' value={chatroom.id} />
        </form>
      </div>
    )
  }
}