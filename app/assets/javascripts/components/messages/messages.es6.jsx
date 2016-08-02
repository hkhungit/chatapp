const { Component }     = React

class Messages extends Component {
  constructor(props){
    super(props)
    this.state = {
      messages: null
    }
  }

  componentWillMount() {
    const { messages } = this.props
    this.setMessages(messages)
  }

  componentWillReceiveProps(props) {
    const { messages } = props
    this.setMessages(messages)
  }

  setMessages(messages){
    if (messages){
      _messages = {}
      messages.forEach((message) => {
        _messages[message.id] = message
      })
      this.setState({
        messages: _messages
      })
    }
  }

  renderContent (messages){
    return Object.keys(messages).map((key) => {
      let message = messages[key]
      return <Message key={message.id} message={message} />
    })
  }

  render (){
    const { messages } = this.state
    let renderContent
    if(messages)
      renderContent  =  this.renderContent(messages)

    return (
      <div className='messages'>
        <div className='messages-inner'>
          {renderContent}
        </div>
      </div>
    )
  }
}