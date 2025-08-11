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

if Rails.env.development?

  index = 1
  
  FactoryBot.define do
    factory :user, class: User do
      name { Faker::Name.name }
      email { Faker::Internet.email }
      phone { Faker::PhoneNumber.phone_number.gsub(/\s/, '') }
      password { "password100" }
      street { Faker::Address.street_address }
      city { Faker::Address.city }
      state { Faker::Address.state }
      country { Faker::Address.country }
      zip_code { Faker::Address.zip_code }
    end

    factory :location do
      # association :owner_id, factory: :user
      street { Faker::Address.street_address }
      city { Faker::Address.city }
      state { Faker::Address.state }
      country { Faker::Address.country }
      zip_code { Faker::Address.zip_code }
      category { ["Home", "Apartment", "Guest House", "Room"].sample }
      price { Faker::Number.between(from: 100, to: 1000) }
      notes { Faker::Lorem.paragraph_by_chars(number: 400) }

      after(:create) do |location|
        5.times do |i|
          location.images.attach(
            io: File.open(Rails.root.join("public", "images", "house-#{index + i}.jpg")),
            filename: "house-#{index + i}.jpg",
            content_type: "image/jpg"
          )
        end
        index += 1
      end
    end
  end
end

# locations = create_list(:location, 24)

24.times do |i|
  user = FactoryBot.create(:user)
  location = FactoryBot.create(:location, user: user)
end