class LineItemPolicy < ApplicationPolicy
  def create?
    record.order.line_items.where(user_id: user.id).none?
  end

  def update?
    record.user == user
  end
end
