class LineItemPolicy < ApplicationPolicy
  def create?
    user
  end

  def destroy?
    record.user == user
  end
end
