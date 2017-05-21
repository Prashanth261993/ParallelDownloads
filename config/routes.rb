Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "parallel_requests#index"
  resources :parallel_requests, only:[:index] do
    #get :extract_download_item_ids, on: :collection
  end
end
