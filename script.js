function loadCalendar() {
    const calendarElement = document.getElementById('calendar').querySelector('tbody');
    const summaryElement = document.getElementById('summary');
    calendarElement.innerHTML = ''; // Clear previous data
    summaryElement.innerHTML = ''; // Clear previous summary

    const daysInMonth = 31;
    const firstDay = new Date(2024, 9, 1).getDay(); // October 2024 starts on a Tuesday

    const sickLeaveDays = [5, 12, 18]; // Sick leaves on these days
    const paidLeaveDays = [11, 20]; // Paid leaves on these days
    const attendedDays = [1, 2, 3, 4, 6, 7, 8, 9, 10, 13, 14, 15, 16, 17, 19, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

    let day = 1;
    for (let i = 0; i < 6; i++) { // 6 rows to cover all days of the month
        let row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                // Empty cells before the start of the month
                cell.classList.add('empty');
            } else if (day > daysInMonth) {
                // Empty cells after the end of the month
                cell.classList.add('empty');
            } else {
                cell.textContent = day;

                // Assign classes and text based on leave types
                if (sickLeaveDays.includes(day)) {
                    cell.classList.add('sick-leave');
                } else if (paidLeaveDays.includes(day)) {
                    cell.classList.add('paid-leave');
                } else if (attendedDays.includes(day)) {
                    cell.classList.add('attended');
                }

                // Mark weekends (Sundays and Saturdays)
                if (j === 0 || j === 6) {
                    cell.classList.add('weekend');
                }

                day++;
            }

            row.appendChild(cell);
        }

        calendarElement.appendChild(row);
    }

    // Generate the attendance summary
    generateSummary(sickLeaveDays, paidLeaveDays, attendedDays, daysInMonth);
}

function generateSummary(sickLeaveDays, paidLeaveDays, attendedDays, totalDays) {
    const summaryElement = document.getElementById('summary');
    
    const totalSickLeave = sickLeaveDays.length;
    const totalPaidLeave = paidLeaveDays.length;
    const totalAttended = attendedDays.length;
    const totalAbsent = totalDays - (totalSickLeave + totalPaidLeave + totalAttended);

    summaryElement.innerHTML += `<p>Total Sick Leave: ${totalSickLeave}</p>`;
    summaryElement.innerHTML += `<p>Total Paid Leave: ${totalPaidLeave}</p>`;
    summaryElement.innerHTML += `<p>Total Present: ${totalAttended}</p>`;
    summaryElement.innerHTML += `<p>Total Absent: ${totalAbsent}</p>`;
}

// Load the calendar on page load
window.onload = loadCalendar;
