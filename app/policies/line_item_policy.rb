class LineItemPolicy < ApplicationPolicy
  def create?
    user
  end

  def destroy?
    record.user == user && record.order.open? && record.order.today?
  end
end
