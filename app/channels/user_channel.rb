# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class UserChannel < ApplicationCable::Channel
  def subscribed
    @channel_stream = "user_#{current_user.id}"
    stream_from @channel_stream
    stream_from_messages
  end

  def unsubscribed
  end


  private

  def stream_from_messages
  end

  def broadcast_response(res)
    ActionCable.server.broadcast @channel_stream, res
  end
end
