document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".image-thumbnail");

  thumbnails.forEach(function (image) {
    image.addEventListener("click", function (e) {
      mainImage.src = e.target.src;
    });
  });

  const calendarDiv = document.getElementById("calendar");
  const calendar = JSON.parse(calendarDiv.dataset.calendar);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  let currentMonth = today.getMonth();
  let calendarControls = document.getElementById("calendar-arrows");
  let arrowLeft = document.getElementById("arrow-left");
  let arrowRight = document.getElementById("arrow-right");

  let monthHeading = months[currentMonth];
  let headingTag = document.createElement("h2");
  headingTag.id = "calendar-heading";
  headingTag.innerText = `${monthHeading}, ${today.getFullYear()}`;
  headingTag.classList.add("text-2xl", "text-center", "mx-auto");
  calendarControls.insertBefore(headingTag, arrowRight);

  // Table Header (days of the week)
  let daysTr = document.createElement("tr");

  let sunday = document.createElement("th");
  sunday.innerText = "Sun";
  daysTr.appendChild(sunday);

  let monday = document.createElement("th");
  monday.innerText = "Mon";
  daysTr.appendChild(monday);

  let tuesday = document.createElement("th");
  tuesday.innerText = "Tue";
  daysTr.appendChild(tuesday);

  let wednesday = document.createElement("th");
  wednesday.innerText = "Wed";
  daysTr.appendChild(wednesday);

  let thursday = document.createElement("th");
  thursday.innerText = "Thu";
  daysTr.appendChild(thursday);

  let friday = document.createElement("th");
  friday.innerText = "Fri";
  daysTr.appendChild(friday);

  let saturday = document.createElement("th");
  saturday.innerText = "Sat";
  daysTr.appendChild(saturday);

  // Create calendar table for each month
  calendar.forEach((month, monthIdx) => {
    let table = document.createElement("table");
    let tr = document.createElement("tr");
    let td = document.createElement("td");

    let endOfMonth = Object.keys(month).length - 1;

    Object.keys(month).forEach((key, idx) => {
      let date = new Date(key);
      let dateMonth = date.getMonth();

      if (idx == 0) {
        table.appendChild(daysTr.cloneNode(true));
        table.id = `calendar-${months[dateMonth]}`;
        table.classList.add("max-w-3xl", "mx-auto");

        if (monthIdx != 0) {
          table.classList.add("hidden");
        }

        table.setAttribute(
          "data-heading",
          `${months[dateMonth]}, ${date.getFullYear()}`
        );

        let dayOfWeek = date.getDay();
        while (dayOfWeek > 0) {
          tr.appendChild(td);
          td = document.createElement("td");
          dayOfWeek -= 1;
        }
      }

      if (tr.childElementCount == 7) {
        table.appendChild(tr);
        tr = document.createElement("tr");
      }

      td = document.createElement("td");
      td.textContent = key.split("-")[1];
      td.setAttribute("data-date", key);
      tr.appendChild(td);

      if (idx == endOfMonth) {
        table.appendChild(tr);
        tr = document.createElement("tr");
        calendarDiv.appendChild(table);
      }
    });
  });

  // Add click events to navigation arrows
  const tables = document.querySelectorAll("#calendar table");
  let currentTable = tables[0];
  let nextTable;
  let previousTable;
  let index = 0;

  arrowLeft.addEventListener("click", function () {
    if (index == 0) {
      return;
    }
    previousTable = currentTable.previousElementSibling;
    headingTag.innerText = previousTable.getAttribute("data-heading");

    currentTable.classList.toggle("hidden");
    previousTable.classList.toggle("hidden");
    currentTable = previousTable;
    index -= 1;
  });

  arrowRight.addEventListener("click", function () {
    if (index == 11) {
      return;
    }
    nextTable = currentTable.nextElementSibling;
    headingTag.innerText = nextTable.getAttribute("data-heading");

    currentTable.classList.toggle("hidden");
    nextTable.classList.toggle("hidden");
    currentTable = nextTable;
    index += 1;
  });
});
