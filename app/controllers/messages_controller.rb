class MessagesController < ApplicationController
  before_action :authenticate_user!

  def create
    message = Message.create(message_param.merge({user_id: current_user.id}))
    message.save

    render json: {
      message: 'Message was created!'
    }
  end

  private

  def message_param
    params.require(:message).permit(:content, :chatroom_id).to_h
  end
end
