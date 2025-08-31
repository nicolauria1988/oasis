document.addEventListener("DOMContentLoaded", function () {
  const mainImage = document.getElementById("main-image");
  const thumbnails = document.querySelectorAll(".image-thumbnail");

  thumbnails.forEach(function (image) {
    image.addEventListener("click", function (e) {
      mainImage.src = e.target.src;
    });
  });

  const calendarDiv = document.getElementById("calendar");
  // const availableDates = JSON.parse(calendarDiv.dataset.availableDates);

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

  // Table Header (days of the week)
  let daysTr = document.createElement("tr");
  daysTr.classList.add("mb-10");

  let sunday = document.createElement("th");
  sunday.classList.add("pb-3");
  sunday.innerText = "Sun";
  daysTr.appendChild(sunday);

  let monday = document.createElement("th");
  monday.classList.add("pb-3");
  monday.innerText = "Mon";
  daysTr.appendChild(monday);

  let tuesday = document.createElement("th");
  tuesday.classList.add("pb-3");
  tuesday.innerText = "Tue";
  daysTr.appendChild(tuesday);

  let wednesday = document.createElement("th");
  wednesday.classList.add("pb-3");
  wednesday.innerText = "Wed";
  daysTr.appendChild(wednesday);

  let thursday = document.createElement("th");
  thursday.classList.add("pb-3");
  thursday.innerText = "Thu";
  daysTr.appendChild(thursday);

  let friday = document.createElement("th");
  friday.classList.add("pb-3");
  friday.innerText = "Fri";
  daysTr.appendChild(friday);

  let saturday = document.createElement("th");
  saturday.classList.add("pb-3");
  saturday.innerText = "Sat";
  daysTr.appendChild(saturday);

  const today = new Date();
  let currentMonth = today.getMonth();

  let monthCount = 1;

  while (monthCount <= 12) {
    let currentDay = new Date(today.getFullYear(), currentMonth, 1);
    let lastDay = new Date(today.getFullYear(), currentMonth + 1, 0);

    let table = document.createElement("table");
    // table.id = `month-${monthCount}`;
    table.classList.add("w-full", "mt-10");

    let tableCaption = document.createElement("caption");
    tableCaption.classList.add("mx-auto", "mb-5");
    let monthHeading = months[currentMonth];

    let yearOffset = Math.floor((today.getMonth() + monthCount - 1) / 12);
    let displayYear = today.getFullYear() + yearOffset;

    let arrowLeft = document.createElement("img");
    arrowLeft.classList.add(
      "inline-block",
      "w-10",
      "mr-5",
      "cursor-pointer",
      "arrow-left"
    );
    arrowLeft.src = "../images/arrow-left.png";
    tableCaption.appendChild(arrowLeft);

    let tableTitle = document.createElement("h1");
    tableTitle.classList.add(
      "text-2xl",
      "text-center",
      "inline-block",
      "align-middle"
    );
    tableTitle.innerText = `${monthHeading}, ${displayYear}`;
    tableCaption.appendChild(tableTitle);

    let arrowRight = document.createElement("img");
    arrowRight.classList.add(
      "inline-block",
      "w-10",
      "ml-5",
      "cursor-pointer",
      "arrow-right"
    );
    arrowRight.src = "../images/arrow-right.png";
    tableCaption.appendChild(arrowRight);

    table.appendChild(tableCaption);
    table.appendChild(daysTr.cloneNode(true));

    if (monthCount != 1) {
      table.classList.add("hidden");
    }

    let tr = document.createElement("tr");

    while (currentDay <= lastDay) {
      if (tr.children.length == 7) {
        table.appendChild(tr);
        tr = document.createElement("tr");
      }

      let td = document.createElement("td");
      td.classList.add("text-center", "p-3", "border", "border-gray-300");
      const dateString = currentDay.toISOString().split("T")[0];
      td.innerText = dateString.split("-")[2];
      tr.appendChild(td);
      currentDay.setDate(currentDay.getDate() + 1);
    }

    table.appendChild(tr);
    calendarDiv.appendChild(table);

    currentMonth = (currentMonth + 1) % 12;
    monthCount += 1;
  }

  // Navigate to next month on arrow click
  const tables = document.querySelectorAll("#calendar table");

  let currentTableIndex = 0;

  function updateTableVisibility(newIndex) {
    tables[currentTableIndex].classList.add("hidden");
    tables[newIndex].classList.remove("hidden");
    currentTableIndex = newIndex;
  }

  tables.forEach((table, index) => {
    const caption = table.querySelector("caption");
    const leftArrow = caption.querySelector(".arrow-left");
    const rightArrow = caption.querySelector(".arrow-right");

    leftArrow.addEventListener("click", function () {
      if (currentTableIndex === 0) return;
      updateTableVisibility(currentTableIndex - 1);
    });

    rightArrow.addEventListener("click", function () {
      if (currentTableIndex === tables.length - 1) return;
      updateTableVisibility(currentTableIndex + 1);
    });
  });
});
