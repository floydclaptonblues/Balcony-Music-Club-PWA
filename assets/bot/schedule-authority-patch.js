(function () {
  'use strict';

  const VENUE_TIME_ZONE = 'America/Chicago';
  const SCHEDULE = [
    { date: '2026-07-02', acts: [['6:00 PM', '8:30 PM', 'FUNKY SOLES'], ['9:00 PM', '11:30 PM', 'MOTHER RUCKUS']] },
    { date: '2026-07-03', acts: [['6:00 PM', '8:30 PM', 'ADO SOUL & THE TRIBE'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
    { date: '2026-07-04', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'JOHN LISI & DELTA FUNK'], ['9:00 PM', '11:30 PM', 'THEE FONK JAM feat. TamarieT']] },
    { date: '2026-07-05', acts: [['3:00 PM', '5:30 PM', 'SIERRA & GREEN NOTES'], ['6:00 PM', '8:30 PM', 'JOSH BENITEZ BAND'], ['9:00 PM', '11:30 PM', 'MAURICE CADE & ESS']] },
    { date: '2026-07-09', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'JAM BRASS BAND']] },
    { date: '2026-07-10', acts: [['6:00 PM', '8:30 PM', 'ADO SOUL & THE TRIBE'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
    { date: '2026-07-11', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', "WOODY'S RAMPAGE"], ['9:00 PM', '11:30 PM', 'JOHN LISI & DELTA FUNK']] },
    { date: '2026-07-12', acts: [['3:00 PM', '5:30 PM', 'DEEJ FLAVA & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'MAURICE CADE & ESS'], ['9:00 PM', '11:30 PM', 'KIM IN THE WIND']] },
    { date: '2026-07-16', acts: [['6:00 PM', '8:30 PM', 'LEROY MARSHALL BAND'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
    { date: '2026-07-17', acts: [['6:00 PM', '8:30 PM', 'PARISH LINE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & THE R&B KINGS']] },
    { date: '2026-07-18', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', 'JON RONIGER'], ['9:00 PM', '11:30 PM', 'ASHLEY PAIGE & SOULCIAL CLUB']] },
    { date: '2026-07-19', acts: [['3:00 PM', '5:30 PM', 'SIERRA & GREEN NOTES'], ['6:00 PM', '8:30 PM', 'GABE STILLMAN BAND'], ['9:00 PM', '11:30 PM', 'KIM IN THE WIND']] },
    { date: '2026-07-23', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
    { date: '2026-07-24', acts: [['6:00 PM', '8:30 PM', 'MOTHER RUCKUS'], ['9:00 PM', '11:30 PM', 'BIG MIKE & THE R&B KINGS']] },
    { date: '2026-07-25', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', 'SUGAR & THE DADDIES'], ['9:00 PM', '11:30 PM', 'FLEURTATIONS']] },
    { date: '2026-07-26', acts: [['3:00 PM', '5:30 PM', 'DEEJ FLAVA & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'MAURICE CADE & ESS'], ['9:00 PM', '11:30 PM', 'KIM IN THE WIND']] },
    { date: '2026-07-30', acts: [['6:00 PM', '8:30 PM', 'TBA'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
    { date: '2026-07-31', acts: [['6:00 PM', '8:30 PM', 'MOTHER RUCKUS'], ['9:00 PM', '11:30 PM', 'BIG MIKE & R&B KINGS']] }
  ];

  const LEGACY = 'assets/bands/bmc-band-assets/assets/bands/';
  const SUPPLIED = 'https://floydclaptonblues.github.io/Balcony-Music-Club-PWA/assets/bands/bmc-band-assets/assets/bands/';
  const UPCOMING = 'https://floydclaptonblues.github.io/UpcomingShows/assets/artists/';
  const JOHN_LISI = 'https://images.squarespace-cdn.com/content/v1/5872a05fb8a79b5c39e888e8/1570220588454-ROAJNS29CYDX7TFZ3B09/johnlisi.jpg?format=1000w';

  const IMAGE_BY_ACT = {
    'TROPICAL WEATHER': SUPPLIED + 'Tropical%20Weather.png',
    'JAM BRASS BAND': SUPPLIED + 'Jam%20Brass%20Band%20Thursday%20%281%29.jpg',
    'JOSH BENITEZ BAND': SUPPLIED + 'Josh%20Benitez%20Band%20Sunday.png',
    'LEROY MARSHALL BAND': SUPPLIED + 'Leroy%20Marshal.jpg',
    'LEROY MARSHAL BAND': SUPPLIED + 'Leroy%20Marshal.jpg',
    'JON RONIGER': SUPPLIED + 'JON%20RONIGER.jpg',
    'FLEURTATIONS': SUPPLIED + 'FLEURTATIONS.jpg',
    'THE FLEURTATIONS': SUPPLIED + 'FLEURTATIONS.jpg',
    'ANDRE LOVETT BAND': LEGACY + 'andre-lovett-band.jpg?v=20260723-current-week-auto',
    'DAPPER DANDIES': LEGACY + 'dapper-dandies.jpg?v=20260723-current-week-auto',
    'SUGAR & THE DADDIES': LEGACY + 'sugar-and-the-daddies.jpg?v=20260723-current-week-auto',
    "WOODY'S RAMPAGE": LEGACY + 'woodys-rampage.jpg?v=20260723-current-week-auto',
    'BIG MIKE & THE R&B KINGS': LEGACY + 'big-mike-rb-kings.webp?v=20260723-current-week-auto',
    'BIG MIKE & R&B KINGS': LEGACY + 'big-mike-rb-kings.webp?v=20260723-current-week-auto',
    'SIERRA & GREEN NOTES': LEGACY + 'sierra-green.jpg?v=20260723-current-week-auto',
    'KIM IN THE WIND': LEGACY + 'kim-in-the-wind.webp?v=20260723-current-week-auto',
    'KAT KILEY EXPERIENCE': LEGACY + 'kat-kiley-experience.webp?v=20260723-current-week-auto',
    'FUNKY SOLES': UPCOMING + 'Funky%20Soles%20Featuring%20Tahj%20Derosier.png?v=20260704-restored',
    'ADO SOUL & THE TRIBE': UPCOMING + 'Ado%20Soul%20Tribe.png?v=20260704-restored',
    'MAURICE CADE & ESS': UPCOMING + 'Maurice%20Cade%20%26%20ESS%20Sunday%206pm.jpg?v=20260704-restored',
    'MOTHER RUCKUS': UPCOMING + 'Mother%20Ruckus.png?v=20260704-restored',
    'DEEJ FLAVA & MOTHER RUCKUS': UPCOMING + 'Mother%20Ruckus.png?v=20260704-restored',
    'PARISH LINE': UPCOMING + 'Louisiana%20Parish%20Line.png?v=20260704-restored',
    'GABE STILLMAN BAND': UPCOMING + 'Gabe%20Stillman.png?v=20260704-restored',
    'ASHLEY PAIGE & SOULCIAL CLUB': UPCOMING + 'Ashley%20Paige%20and%20the%20Soulcial%20Club.jpeg?v=20260704-restored',
    'THEE FONK JAM': UPCOMING + 'Thee%20PlayMateZ.png?v=20260704-restored',
    'THEE FONK JAM FEAT. TAMARIET': UPCOMING + 'Thee%20PlayMateZ.png?v=20260704-restored',
    'JOHN LISI & DELTA FUNK': JOHN_LISI,
    'JOHN LISI AND DELTA FUNK': JOHN_LISI
  };

  function key(value) {
    return String(value || '').replace(/’/g, "'").replace(/\s+/g, ' ').trim().toUpperCase();
  }

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = text;
    return node;
  }

  function dateObject(dateString) {
    const parts = dateString.split('-').map(Number);
    return new Date(Date.UTC(parts[0], parts[1] - 1, parts[2], 12));
  }

  function dateKeyInVenueTimeZone(now) {
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: VENUE_TIME_ZONE,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).formatToParts(now || new Date());
    const values = {};
    parts.forEach(function (part) {
      if (part.type !== 'literal') values[part.type] = part.value;
    });
    return values.year + '-' + values.month + '-' + values.day;
  }

  function mondayFor(date) {
    const monday = new Date(date.getTime());
    const daysSinceMonday = (monday.getUTCDay() + 6) % 7;
    monday.setUTCDate(monday.getUTCDate() - daysSinceMonday);
    return monday;
  }

  function daysInWeekContaining(date) {
    const start = mondayFor(date);
    const end = new Date(start.getTime());
    end.setUTCDate(end.getUTCDate() + 7);
    return SCHEDULE.filter(function (day) {
      const candidate = dateObject(day.date);
      return candidate >= start && candidate < end;
    });
  }

  function visibleWeek(now) {
    const venueToday = dateObject(dateKeyInVenueTimeZone(now));
    const currentWeek = daysInWeekContaining(venueToday);
    if (currentWeek.length) return currentWeek;

    const nextDay = SCHEDULE.find(function (day) {
      return dateObject(day.date) >= venueToday;
    });
    if (nextDay) return daysInWeekContaining(dateObject(nextDay.date));

    if (!SCHEDULE.length) return [];
    return daysInWeekContaining(dateObject(SCHEDULE[SCHEDULE.length - 1].date));
  }

  function prettyDate(dateString) {
    return dateObject(dateString).toLocaleDateString(undefined, {
      timeZone: 'UTC',
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  }

  function scheduleMonthLabel() {
    if (!SCHEDULE.length) return 'Live music schedule';
    const first = dateObject(SCHEDULE[0].date);
    const last = dateObject(SCHEDULE[SCHEDULE.length - 1].date);
    const firstLabel = first.toLocaleDateString(undefined, { timeZone: 'UTC', month: 'long', year: 'numeric' });
    const lastLabel = last.toLocaleDateString(undefined, { timeZone: 'UTC', month: 'long', year: 'numeric' });
    return firstLabel === lastLabel ? firstLabel + ' live music' : 'Live music schedule';
  }

  function installStyle() {
    if (document.getElementById('bmc-schedule-authority-style')) return;
    const style = element('style');
    style.id = 'bmc-schedule-authority-style';
    style.textContent = '.frozen-lineup-panel{overflow:hidden}.frozen-lineup-head{display:flex;align-items:center;justify-content:space-between;gap:10px;flex-wrap:wrap}.frozen-week-strip{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.frozen-day-card{aspect-ratio:1/1;min-height:190px;overflow:hidden;display:flex;flex-direction:column;padding:10px}.frozen-day-card h3{font-size:13px;margin-bottom:6px}.frozen-band-photo{width:100%;height:42%;object-fit:cover;border:2px solid rgba(255,216,87,.58);border-radius:10px;margin-bottom:8px;background:#120728}.frozen-act{display:grid;grid-template-columns:auto 1fr;gap:5px;align-items:start;border-top:1px dashed rgba(255,255,255,.18);padding-top:5px;margin-top:5px}.frozen-act span{color:#5ee6ff;font-size:10px;line-height:1.1;white-space:nowrap}.frozen-act b{font-size:10px;line-height:1.12;overflow-wrap:anywhere;color:#fff6e8}.bmc-calendar-modal{position:fixed;inset:0;z-index:99999;display:none;align-items:center;justify-content:center;padding:14px}.bmc-calendar-modal.is-open{display:flex}.bmc-calendar-backdrop{position:absolute;inset:0;background:rgba(5,2,11,.82);backdrop-filter:blur(6px);-webkit-backdrop-filter:blur(6px)}.bmc-calendar-dialog{position:relative;z-index:1;width:min(980px,100%);max-height:86svh;overflow:auto;border:3px solid #000;border-radius:18px;background:linear-gradient(180deg,rgba(50,25,86,.98),rgba(18,7,34,.98));box-shadow:0 28px 80px rgba(0,0,0,.72),0 0 0 2px rgba(255,216,87,.35);padding:16px}.bmc-calendar-close{float:right;margin-left:8px}.bmc-calendar-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.bmc-calendar-day{background:rgba(0,0,0,.18)}.bmc-calendar-act{display:grid;grid-template-columns:86px 1fr;gap:10px;align-items:start;border-top:1px dashed rgba(255,255,255,.22);padding-top:8px;margin-top:8px}.bmc-calendar-band-photo{display:block;width:86px;height:64px;object-fit:cover;border:2px solid rgba(255,216,87,.58);border-radius:10px;background:#120728;box-shadow:0 7px 18px rgba(0,0,0,.32)}.bmc-calendar-act-info{display:grid;gap:4px;min-width:0}.bmc-calendar-act b{color:#fff6e8;font-size:13px;line-height:1.15;overflow-wrap:anywhere}.bmc-calendar-act span{color:#5ee6ff;font-size:12px;line-height:1.15}.bmc-calendar-open{overflow:hidden}@media(max-width:760px){.frozen-week-strip{display:flex;overflow-x:auto;gap:10px;padding-bottom:6px;scroll-snap-type:x mandatory}.frozen-day-card{flex:0 0 74vw;max-width:290px;scroll-snap-align:start}.bmc-calendar-list{grid-template-columns:1fr}.bmc-calendar-act{grid-template-columns:76px 1fr}.bmc-calendar-band-photo{width:76px;height:56px}.bmc-calendar-dialog{max-height:88svh;padding:12px}}';
    document.head.appendChild(style);
  }

  function imageForAct(actName, className) {
    const source = IMAGE_BY_ACT[key(actName)];
    if (!source) {
      const blank = element('div', className, '');
      blank.setAttribute('aria-hidden', 'true');
      return blank;
    }
    const image = new Image();
    image.className = className;
    image.src = source;
    image.alt = actName + ' at Balcony Music Club';
    image.loading = 'lazy';
    image.decoding = 'async';
    return image;
  }

  function makeCalendarDay(day) {
    const card = element('article', 'card bmc-calendar-day');
    card.appendChild(element('h3', '', prettyDate(day.date)));
    day.acts.forEach(function (act) {
      const row = element('div', 'bmc-calendar-act');
      row.appendChild(imageForAct(act[2], 'bmc-calendar-band-photo'));
      const info = element('div', 'bmc-calendar-act-info');
      info.appendChild(element('b', '', act[2]));
      info.appendChild(element('span', '', act[0] + '–' + act[1]));
      row.appendChild(info);
      card.appendChild(row);
    });
    return card;
  }

  function closeCalendar() {
    const modal = document.getElementById('bmc-full-calendar');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('bmc-calendar-open');
  }

  function openCalendar() {
    let modal = document.getElementById('bmc-full-calendar');
    if (!modal) {
      modal = element('div', 'bmc-calendar-modal');
      modal.id = 'bmc-full-calendar';
      modal.setAttribute('aria-hidden', 'true');
      modal.innerHTML = '<div class="bmc-calendar-backdrop" data-calendar-close="true"></div><div class="bmc-calendar-dialog" role="dialog" aria-modal="true" aria-labelledby="bmc-calendar-title"><button class="button ghost bmc-calendar-close" type="button" data-calendar-close="true">Close</button><span class="ribbon">Full Calendar</span><h2 id="bmc-calendar-title"></h2><div class="bmc-calendar-list"></div></div>';
      modal.querySelector('#bmc-calendar-title').textContent = scheduleMonthLabel().replace(/ live music$/i, '') + ' Calendar';
      modal.querySelectorAll('[data-calendar-close="true"]').forEach(function (button) {
        button.addEventListener('click', closeCalendar);
      });
      const list = modal.querySelector('.bmc-calendar-list');
      SCHEDULE.forEach(function (day) {
        list.appendChild(makeCalendarDay(day));
      });
      document.body.appendChild(modal);
    }
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('bmc-calendar-open');
    const closeButton = modal.querySelector('.bmc-calendar-close');
    if (closeButton) closeButton.focus();
  }

  function bindCalendarButtons() {
    document.querySelectorAll('#openFullJulyCalendar,#openFullSchedule,.bmc-calendar-button').forEach(function (button) {
      button.textContent = 'Open Full Calendar';
      if (button.dataset.calendarBound === 'true') return;
      button.dataset.calendarBound = 'true';
      button.addEventListener('click', function (event) {
        event.preventDefault();
        openCalendar();
      });
    });
  }

  function dayCard(day) {
    const card = element('article', 'card frozen-day-card');
    card.appendChild(element('h3', '', prettyDate(day.date)));
    const firstNamedAct = day.acts.find(function (act) { return key(act[2]) !== 'TBA'; }) || day.acts[0];
    if (firstNamedAct) card.appendChild(imageForAct(firstNamedAct[2], 'frozen-band-photo'));
    day.acts.forEach(function (act) {
      const row = element('div', 'frozen-act');
      row.appendChild(element('span', '', act[0].replace(' PM', '')));
      row.appendChild(element('b', '', act[2]));
      card.appendChild(row);
    });
    return card;
  }

  function render() {
    const section = document.getElementById('schedule');
    if (!section) return;

    installStyle();
    const week = visibleWeek(new Date());
    const signature = week.map(function (day) { return day.date; }).join(',');
    if (section.dataset.scheduleSignature === signature && section.querySelector('.frozen-week-strip')) {
      bindCalendarButtons();
      return;
    }

    section.removeAttribute('data-frozen-calendar');
    section.dataset.scheduleSignature = signature;
    section.textContent = '';
    section.classList.add('frozen-lineup-panel');
    section.setAttribute('aria-live', 'polite');

    const head = element('div', 'frozen-lineup-head');
    const heading = element('div');
    heading.innerHTML = '<span class="ribbon"></span><h2>This Week\'s Lineup:</h2>';
    heading.querySelector('.ribbon').textContent = scheduleMonthLabel();
    head.appendChild(heading);

    const button = element('button', 'button primary bmc-calendar-button', 'Open Full Calendar');
    button.type = 'button';
    head.appendChild(button);
    section.appendChild(head);

    if (week.length) {
      const strip = element('div', 'frozen-week-strip');
      week.forEach(function (day) {
        strip.appendChild(dayCard(day));
      });
      section.appendChild(strip);
    } else {
      section.appendChild(element('p', 'note', 'The next live-music lineup has not been posted yet.'));
    }

    bindCalendarButtons();
  }

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeCalendar();
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
  window.addEventListener('load', render);
})();
