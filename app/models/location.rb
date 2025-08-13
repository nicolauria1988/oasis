class Location < ApplicationRecord
  belongs_to :user
  has_many :reservations
  has_many_attached :images, dependent: :purge

  validates :street, :category, presence: true
  validates :city, presence: true, format: { with: /\A[a-zA-Z\s.-]+\z/ }
  validates :state, presence: true, format: { with: /\A[A-Z][a-z]+(?: +[A-Z][a-z]+)*\z/ }
  validates :country, presence: true
  validates :zip_code, presence: true, format: { with: /\A\d{5}(?:-\d{4})?\z/ }
  validates :notes, presence: true, length: { minimum: 300, maximum: 1000 }
  validates :price, presence: true, format: { with: /\A\d+(?:\.\d{1,2})?\z/ }
end
