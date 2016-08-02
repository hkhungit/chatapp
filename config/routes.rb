Rails.application.routes.draw do
  
  root 'home#index'
  resources :home, only: [:index]
  resources :chatrooms, only: [:create]
  resources :messages, only: [:create]
  mount ActionCable.server => '/cable'

  devise_for :users
end
