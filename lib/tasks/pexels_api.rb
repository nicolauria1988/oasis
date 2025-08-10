require "pexels"

client = Pexels::Client.new(Rails.application.credentials.pexels[:key])

client.photos.search("Home", per_page: 150).each_with_index do |photo, idx|
  photo_url = photo.src.original

  file_path = Rails.root.join("public", "images", "home-#{idx}")

  File.open(file_path, 'wb') do |file|
    file.write(photo_url.read)
  end
end

