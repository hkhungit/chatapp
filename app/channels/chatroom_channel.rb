class ChatroomChannel < ApplicationCable::Channel
  def subscribed
    @chatroom_id = params['chatroom_id']
    @channel_stream = "chat_#{@chatroom_id}"
    stream_from @channel_stream
    stream_from_messages
  end

  def unsubscribed
    @db_cursor.close if @db_cursor
  end


  private

  def stream_from_messages
    @db_cursor = Message.where({chatroom_id: @chatroom_id}).all.raw.changes(include_types: :add)

    Thread.new do
      @db_cursor.each do |change|
        response_data = {
          operation: 'new_message',
          status: 'success',
          data: change['new_val'],
          message: 'New messages created'
        }
        
        broadcast_response(response_data)
      end
    end
  end

  def broadcast_response(res)
    ActionCable.server.broadcast @channel_stream, res
  end
end
