# oasisdev.app

Application for hosting and booking homes

- Digital Ocean Droplet (Ubuntu 25.04) running Apache

## Stack

Ruby 3.4.4, Rails 8.0.2, PostgreSQL 17, Tailwind CSS 4

## Notes

- Repository includes images for database seeding
- To add available_dates to all locations in console run:

```ruby
Location.all.each do |location|
  location.available_dates = [{"startDate" => "08-21-2025", "endDate" => "12-31-2025"}]
  location.save
end
```

- To test the application feel free to create account with fake email
  (there is currently no email verification)
