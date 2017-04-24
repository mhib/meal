class OrderPolicy < ApplicationPolicy
  def create?
    user
  end

  def update?
    user == record.owner
  end

  def archived_page?
    create?
  end
end
