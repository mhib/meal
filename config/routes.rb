Rails.application.routes.draw do
  root to: 'meals#index'
  get '/auth/github/callback' => 'sessions#create'
  get '/sign_in' => 'sessions#new', as: :sign_in
  get '/sign_out' => 'sessions#destroy', as: :sign_out
  get '/signed_out' => 'sessions#signed_out', as: :signed_out
  get '/archived_orders/:page' => 'orders#archived_page'
  resource :orders, only: [:create, :destroy, :update]
  resource :line_items, only: [:create, :destroy]
end
