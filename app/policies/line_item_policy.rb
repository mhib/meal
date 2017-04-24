class LineItemPolicy < ApplicationPolicy
  def create?
    record.order.line_items.where(user_id: current_user.id).none?
  end

  def update?
    record.user == current_user
  end
end
