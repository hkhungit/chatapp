
class Chatroom
  include NoBrainer::Document
  include NoBrainer::Document::Timestamps
  extend Enumerize

  field :users, :type => Array
  field :name,  :type => String
  field :type,  :type => String

  before_create :generate_type, :sort_users, :set_name
  enumerize :type, in: [:single, :group], default: :single

  has_many :messages

  def self.find_by_users(users, single = true)
    type      = single ? :single : :group
    _users    = users.map{|user| user.id }
    chatroom  = Chatroom.where(->(doc) { doc[:users].map(->(user) { user[:id]} ).eq _users.sort }).where({type: type}).first
    chatroom  = Chatroom.create({users: users}) if chatroom.nil?
    chatroom
  end

  def format(type = :single, args =  nil)
    if args.nil?
      send("format_#{type}")
    else
      send("format_#{type}", args)
    end
  end

  private
  def format_single
    self.as_json
  end

  def format_with_messages(args = nil)
    mess = messages
    if args.present?
      mess = mess.limit(args[:limit]) if args[:limit].present?
      mess = mess.skip(args[:skip]) if args[:skip].present?
      mess = mess.skip(args[:offset]) if args[:offset].present?
    end
    chatroom = self.as_json
    chatroom.merge!(messages: mess.as_json )
  end

  def sort_users
    users.map!{ |user| user.format(:chatroom) }
    users.sort_by!{|user| user['id']}
  end

  def generate_type
    self.type = :group if type == :single && users.size > 2
  end

  def set_name
    unless name.present?
      names = users.map { |user| user['username'] }
      self.name = names.join(', ')  
    end
  end
end
