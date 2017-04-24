class UserSerializer < ActiveModel::Serializer
  attributes :id, :name, :uid, :provider
end
