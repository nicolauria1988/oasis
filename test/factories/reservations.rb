FactoryBot.define do
  factory :reservation do
    user { nil }
    location { nil }
    dates { "MyText" }
    total { "MyString" }
  end
end
