# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require 'factory_bot_rails'
require 'faker'

FactoryBot.define do
  factory :user, class: User do
    name { Faker::Name.name }
    email { Faker::Internet.safe_email }
    phone { Faker::PhoneNumber.phone_number }
    password_digest { "password100" }
    street { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state }
    country { Faker::Address.country }
    zip_code { Faker::Address.zip_code }
  end

  factory :location do
    association :owner_id, factory: :user
    street { Faker::Address.street_address }
    city { Faker::Address.city }
    state { Faker::Address.state }
    country { Faker::Address.country }
    zip_code { Faker::Address.zip_code }
    category { ["Home", "Apartment", "Guest House", "Room"].sample }
    price { Faker::Number.between(from: 100, to: 1000) }
    notes { Faker::HTML.paragraph(sentence_count: 10) }
  end
end