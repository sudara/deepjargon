Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  get '/', to: 'site#index'
  get '/sitemap.txt', to: 'site#sitemap'
  post '/deploy', to: 'site#deploy'
  get '/:definition', to: 'site#index'
end
