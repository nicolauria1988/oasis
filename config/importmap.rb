# Pin npm packages by running ./bin/importmap
# pin_all_from "app/javascript/src", under: "src"

pin "application"
pin "header", to: "header.js"
pin "calendar", to: "calendar.js", preload: false
pin "images", to: "images.js", preload: false