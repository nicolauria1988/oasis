class User < ApplicationRecord
  has_secure_password
  has_one_attached :avatar, dependent: :purge
  has_many :locations
  has_many :reservations
  
  # User Sign Up
  validates :password, presence: true, length: { minimum: 10 }, on: :create
  validates :email, presence: true, uniqueness: true, format: { with: /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i }, on: :create

  # User add info to profile
  validates :name, :street, presence: true, on: :update
  validates :phone, presence: true, format: { with: /\A(?:\+?1[-. ]?)?\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})\z/ }, on: :update
  validates :city, presence: true, format: { with: /\A[a-zA-Z\s.-]+\z/ }, on: :update
  validates :state, presence: true, format: { with: /\A[A-Z][a-z]+(?: +[A-Z][a-z]+)*\z/ }, on: :update
  validates :country, presence: true, format: { with: /\A[A-Za-z\s'-]+\z/ }, on: :update
  validates :zip_code, presence: true, format: { with: /\A\d{5}(?:-\d{4})?\z/ }, on: :update

  generates_token_for :password_reset, expires_in: 15.minutes do
    password_salt&.last(10)
  end

  generates_token_for :email_confirmation, expires_in: 24.hours do
    email
  end
end
