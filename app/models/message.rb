class Message
  include NoBrainer::Document
  include NoBrainer::Document::Timestamps

  field :content, :type => String, required: true
  belongs_to :user
  belongs_to :chatroom
end
