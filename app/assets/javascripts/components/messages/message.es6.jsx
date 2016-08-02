const { Component }     = React

class Message extends Component {
  constructor(props){
    super(props)
    this.state = {
      message: null
    }
  }

  componentWillMount() {
    const { message } = this.props
    if (message)
      this.setState({
        message: message
      })
  }

  componentWillReceiveProps(props) {
    const { message } = props
    if (message)
      this.setState({
        message: message
      })
  }

  render (){
    const { message } = this.props
    const user  = $('.current-user').data('react-props')
    let right = 'left'
    debugger
    if (message && message.user_id == user.id)
      right = 'right'

    return (
      <div className='message'>
        {message && <p className={'list-group-item ' + right}>{message.content}</p>}
      </div>
    )
  }
}