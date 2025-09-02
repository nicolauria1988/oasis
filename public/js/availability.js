document.addEventListener('DOMContentLoaded', function () {
  const calendarDiv = document.getElementById('calendar');
  const availability = JSON.parse(availableDates);
  const reservations = JSON.parse(reservedDates);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  // Table Header (days of the week)
  let daysTr = document.createElement('tr');
  daysTr.classList.add('mb-10');

  let sunday = document.createElement('th');
  sunday.classList.add('pb-3');
  sunday.innerText = 'Sun';
  daysTr.appendChild(sunday);

  let monday = document.createElement('th');
  monday.classList.add('pb-3');
  monday.innerText = 'Mon';
  daysTr.appendChild(monday);

  let tuesday = document.createElement('th');
  tuesday.classList.add('pb-3');
  tuesday.innerText = 'Tue';
  daysTr.appendChild(tuesday);

  let wednesday = document.createElement('th');
  wednesday.classList.add('pb-3');
  wednesday.innerText = 'Wed';
  daysTr.appendChild(wednesday);

  let thursday = document.createElement('th');
  thursday.classList.add('pb-3');
  thursday.innerText = 'Thu';
  daysTr.appendChild(thursday);

  let friday = document.createElement('th');
  friday.classList.add('pb-3');
  friday.innerText = 'Fri';
  daysTr.appendChild(friday);

  let saturday = document.createElement('th');
  saturday.classList.add('pb-3');
  saturday.innerText = 'Sat';
  daysTr.appendChild(saturday);

  const today = new Date();
  let currentMonth = today.getMonth();

  let monthCount = 1;

  // Variables for td click events
  let startDate = null;
  let endDate = null;

  // If availability is already set
  if (availability) {
    startDate = availability[0].startDate;
    endDate = availability[0].endDate;
  }

  // Create Div to hold added date and submit button
  let addedDate = document.getElementById('added-date');
  let dateRange = document.createElement('div');
  dateRange.classList.add(
    'max-w-3xl',
    'mx-auto',
    'p-5',
    'border',
    'border-gray-300',
    'flex',
    'justify-between',
    'items-center',
    'mb-5'
  );

  const closeIcon = document.createElement('img');
  closeIcon.classList.add('w-5', 'cursor-pointer');
  closeIcon.src = '/images/close-icon.png';

  closeIcon.addEventListener('click', function (e) {
    startDate = null;
    endDate = null;
    dateRange.remove();
  });

  const button = document.createElement('button');
  button.classList.add(
    'max-w-3xl',
    'w-full',
    'block',
    'mx-auto',
    'p-5',
    'border',
    'border-gray-300',
    'cursor-pointer'
  );
  button.textContent = 'Save';

  button.addEventListener('click', async () => {
    let data;

    if (typeof startDate === 'string' || !startDate) {
      data = {
        availableDates: [
          {
            startDate: startDate,
            endDate: endDate,
          },
        ],
      };
    } else {
      data = {
        availableDates: [
          {
            startDate: startDate.dataset.date,
            endDate: endDate.dataset.date,
          },
        ],
      };
    }

    await fetch(`/location/${locationId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken,
      },
      body: JSON.stringify(data),
    });

    window.location.href = '/account';
  });

  if (startDate && endDate) {
    dateRange.innerText = `${startDate} - ${endDate}`;

    dateRange.appendChild(closeIcon);
    addedDate.appendChild(dateRange);
    addedDate.appendChild(button);

    window.scrollTo(0, document.body.scrollHeight);
  }

  while (monthCount <= 12) {
    let currentDay = new Date(today.getFullYear(), currentMonth, 1);
    let lastDay = new Date(today.getFullYear(), currentMonth + 1, 0);

    let table = document.createElement('table');
    table.classList.add('w-full', 'mt-10');

    let tableCaption = document.createElement('caption');
    tableCaption.classList.add('mx-auto', 'mb-5');
    let monthHeading = months[currentMonth];

    let yearOffset = Math.floor((today.getMonth() + monthCount - 1) / 12);
    let displayYear = today.getFullYear() + yearOffset;

    let arrowLeft = document.createElement('img');
    arrowLeft.classList.add(
      'inline-block',
      'w-10',
      'mr-5',
      'cursor-pointer',
      'arrow-left'
    );
    arrowLeft.src = '/images/arrow-left.png';
    tableCaption.appendChild(arrowLeft);

    let tableTitle = document.createElement('h1');
    tableTitle.classList.add(
      'text-2xl',
      'text-center',
      'inline-block',
      'align-middle'
    );
    tableTitle.innerText = `${monthHeading}, ${displayYear}`;
    tableCaption.appendChild(tableTitle);

    let arrowRight = document.createElement('img');
    arrowRight.classList.add(
      'inline-block',
      'w-10',
      'ml-5',
      'cursor-pointer',
      'arrow-right'
    );
    arrowRight.src = '/images/arrow-right.png';
    tableCaption.appendChild(arrowRight);

    table.appendChild(tableCaption);
    table.appendChild(daysTr.cloneNode(true));

    if (monthCount != 1) {
      table.classList.add('hidden');
    }

    let tr = document.createElement('tr');

    while (currentDay <= lastDay) {
      if (tr.children.length == 7) {
        table.appendChild(tr);
        tr = document.createElement('tr');
      }

      let td = document.createElement('td');
      td.classList.add(
        'text-center',
        'p-3',
        'border',
        'border-gray-300',
        'cursor-pointer'
      );

      const dateString = currentDay.toISOString().split('T')[0];
      td.dataset.date = dateString;
      td.innerText = dateString.split('-')[2];

      if (currentDay <= today || isDateInRange(currentDay, reservations)) {
        td.classList.add('bg-gray-100');
      }

      td.addEventListener('click', function (e) {
        const tdDate = new Date(e.target.dataset.date);

        if (tdDate <= today || isDateInRange(tdDate, reservations)) {
          return;
        }

        if (!startDate) {
          e.target.style.backgroundColor = 'aliceblue';
          startDate = e.target;
        } else if (!endDate) {
          startDate.style.backgroundColor = '#fff';
          endDate = e.target;

          dateRange.innerText = `${startDate.dataset.date} - ${endDate.dataset.date}`;

          dateRange.appendChild(closeIcon);
          addedDate.appendChild(dateRange);
          addedDate.appendChild(button);

          window.scrollTo(0, document.body.scrollHeight);
        } else {
          return;
        }
      });

      tr.appendChild(td);
      currentDay.setDate(currentDay.getDate() + 1);
    }

    table.appendChild(tr);
    calendarDiv.appendChild(table);

    currentMonth = (currentMonth + 1) % 12;
    monthCount += 1;
  }

  // Navigate to next month on arrow click
  const tables = document.querySelectorAll('#calendar table');

  let currentTableIndex = 0;

  function updateTableVisibility(newIndex) {
    tables[currentTableIndex].classList.add('hidden');
    tables[newIndex].classList.remove('hidden');
    currentTableIndex = newIndex;
  }

  function isDateInRange(date, ranges) {
    const d = new Date(date);

    for (const range of ranges) {
      const start = new Date(range.startDate);
      const end = new Date(range.endDate);

      if (d >= start && d <= end) {
        return true;
      }
    }

    return false;
  }

  tables.forEach((table, index) => {
    const caption = table.querySelector('caption');
    const leftArrow = caption.querySelector('.arrow-left');
    const rightArrow = caption.querySelector('.arrow-right');

    leftArrow.addEventListener('click', function () {
      if (currentTableIndex === 0) return;
      updateTableVisibility(currentTableIndex - 1);
    });

    rightArrow.addEventListener('click', function () {
      if (currentTableIndex === tables.length - 1) return;
      updateTableVisibility(currentTableIndex + 1);
    });
  });
});
