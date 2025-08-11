class CreateLocations < ActiveRecord::Migration[8.0]
  def change
    create_table :locations do |t|
      t.references :user, null: false, foreign_key: true
      t.string :street
      t.string :city
      t.string :state
      t.string :country
      t.string :zip_code
      t.string :category
      t.string :price
      t.text :notes
      t.json :available_dates, array: true, default: []
      t.float :rating, precision: 2, scale: 1

      t.timestamps
    end
  end
end
