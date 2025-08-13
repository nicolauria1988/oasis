class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :location

  validates :user, :location, :start_date, :end_date, :total, presence: true
end
