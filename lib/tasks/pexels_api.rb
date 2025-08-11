require File.expand_path(File.join(File.dirname(__FILE__), '../..', 'config', 'environment'))
require "open-uri"
require "pexels"

client = Pexels::Client.new(Rails.application.credentials.pexels[:key])

client.photos.search("House", per_page: 150).each_with_index do |photo, idx|
  image_url = photo.src["large"]
  
  file_path = Rails.root.join("public", "images", "home-#{idx}.jpeg")

  URI.open(image_url) do |image_data|
    File.open(file_path, "wb") do |file|
      file.write(image_data.read)
    end
  end
end