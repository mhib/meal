Rails.application.config.middleware.use OmniAuth::Builder do
  provider :github, ENV['GITHUB_ID'], ENV['GITHUB_SECRET'], scope: 'user', callback_path: nil
  provider :facebook, ENV['FACEBOOK_ID'], ENV['FACEBOOK_SECRET'], scope: 'public_profile'
end
