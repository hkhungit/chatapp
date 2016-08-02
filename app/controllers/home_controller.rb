class HomeController < ApplicationController
  before_action :authenticate_user!

  def index
    @chatroom = Chatroom.all 
  end 
end
