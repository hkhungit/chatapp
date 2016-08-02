class User
  include NoBrainer::Document
  include NoBrainer::Document::Timestamps
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  field :username,           :type => String
  field :email,              :type => String, :default => ""
  field :encrypted_password, :type => String, :default => ""
  field :reset_password_token,   :type => String
  field :reset_password_sent_at, :type => Time
  field :remember_created_at, :type => Time
  field :sign_in_count,      :type => Integer, :default => 0
  field :current_sign_in_at, :type => Time
  field :last_sign_in_at,    :type => Time
  field :current_sign_in_ip, :type => String
  field :last_sign_in_ip,    :type => String

  def chatrooms
    rooms = Chatroom.where(->(doc) { doc[:users].contains(->(user) { user[:id].eq id }) })
    rooms_res = []
    rooms.each do |room|
      res = {
        id: room.id,
        name: room.name,
        type: room.type,
        messages: room.messages
      }
      rooms_res << res
    end
    rooms_res
  end

  def format(type = :single)
    send("format_#{type}")
  end

  private

  def format_single
    self.as_json(except: [:tokens, :password, :password_digest, :inviter_ids, :friend_ids])
  end

  def format_chatroom
    user =  self.as_json(only: [:id, :username])
    user.merge!({last_seen: Time.now})
  end
end
