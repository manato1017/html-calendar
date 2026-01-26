    const monthYearElement = document.getElementById('monthYear');
    const calendarBody = document.getElementById('calendar-body');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    let currentDate = new Date();

    // 祝日判定ロジック（簡易版：主要な祝日と振替休日、ハッピーマンデーに対応）
    function getHolidayName(year, month, day) {
        const dateStr = `${month + 1}/${day}`;
        const dayOfWeek = new Date(year, month, day).getDay(); // 0:日, 1:月...
        const nthWeek = Math.floor((day - 1) / 7) + 1;

        // 固定祝日
        const fixedHolidays = {
            "1/1": "元日",
            "2/11": "建国記念の日",
            "2/23": "天皇誕生日",
            "4/29": "昭和の日",
            "5/3": "憲法記念日",
            "5/4": "みどりの日",
            "5/5": "こどもの日",
            "8/11": "山の日",
            "11/3": "文化の日",
            "11/23": "勤労感謝の日"
        };

        if (fixedHolidays[dateStr]) return fixedHolidays[dateStr];

        // ハッピーマンデー
        if (month === 0 && nthWeek === 2 && dayOfWeek === 1) return "成人の日";
        if (month === 6 && nthWeek === 3 && dayOfWeek === 1) return "海の日";
        if (month === 8 && nthWeek === 3 && dayOfWeek === 1) return "敬老の日";
        if (month === 9 && nthWeek === 2 && dayOfWeek === 1) return "スポーツの日";

        // 春分の日・秋分の日（簡易計算式）
        if (month === 2 && day === Math.floor(20.8431 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4))) return "春分の日";
        if (month === 8 && day === Math.floor(23.2488 + 0.242194 * (year - 1980) - Math.floor((year - 1980) / 4))) return "秋分の日";

        // 振替休日判定（祝日が日曜日の場合、翌日以降の祝日でない日を振替休日にする）
        // 簡易的に「前日が日曜かつ祝日」なら振替休日
        const prevDate = new Date(year, month, day - 1);
        if (dayOfWeek === 1 && getHolidayName(prevDate.getFullYear(), prevDate.getMonth(), prevDate.getDate())) {
            // 5/3, 5/4が日曜の場合の特殊ケースは考慮が必要だが、基本は「振替休日」
            return "振替休日";
        }

        return null;
    }

    function renderCalendar(date) {
        const year = date.getFullYear();
        const month = date.getMonth();

        monthYearElement.textContent = `${year}年 ${month + 1}月`;

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const lastDateOfMonth = new Date(year, month + 1, 0).getDate();

        const today = new Date();
        const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

        calendarBody.innerHTML = '';

        let dateCounter = 1;
        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');

                if (i === 0 && j < firstDayOfMonth) {
                    cell.classList.add('empty');
                } else if (dateCounter > lastDateOfMonth) {
                    cell.classList.add('empty');
                } else {
                    cell.textContent = dateCounter;

                    if (j === 0) cell.classList.add('sun');
                    if (j === 6) cell.classList.add('sat');

                    // 祝日判定
                    const holidayName = getHolidayName(year, month, dateCounter);
                    if (holidayName) {
                        cell.classList.add('holiday');
                        cell.title = holidayName; // マウスホバーで表示
                    }

                    if (isCurrentMonth && dateCounter === today.getDate()) {
                        cell.classList.add('today');
                    }

                    dateCounter++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
            if (dateCounter > lastDateOfMonth) break;
        }
    }

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar(currentDate);
    });

    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar(currentDate);
    });

    window.onload = () => {
        renderCalendar(currentDate);
    };
