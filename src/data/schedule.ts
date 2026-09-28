import type { ScheduleItem } from './types';

// October 2026 management schedule supplied September 28, 2026.
// Mirrored to UpcomingShows/shows.json and assets/bot/schedule-authority-patch.js.
// All 47 slots retained: four blank artist slots are TBA; billings are verbatim.
// Start times are supplied; end times retain the existing 2.5-hour slot convention.
// All times America/Chicago. Historical schedules remain in Git history.

const schedule2026 = [
  { date: '2026-10-01', dayLabel: 'Thursday • October 1', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-10-02', dayLabel: 'Friday • October 2', acts: [['6:00 PM', '8:30 PM', 'ELECTRIC BARRELHOUSE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-10-03', dayLabel: 'Saturday • October 3', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', 'TBA'], ['9:00 PM', '11:30 PM', 'RR SMOKIN FOUNDATION']] },
  { date: '2026-10-04', dayLabel: 'Sunday • October 4', acts: [['3:00 PM', '5:30 PM', 'DEEJ FK & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'ARMANI SMITH']] },
  { date: '2026-10-08', dayLabel: 'Thursday • October 8', acts: [['6:00 PM', '8:30 PM', 'MAURICE CADE & ESS'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-10-09', dayLabel: 'Friday • October 9', acts: [['6:00 PM', '8:30 PM', 'ELECTRIC BARRELHOUSE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-10-10', dayLabel: 'Saturday • October 10', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'SUGAR & THE DADDIES'], ['9:00 PM', '11:30 PM', 'TBA']] },
  { date: '2026-10-11', dayLabel: 'Sunday • October 11', acts: [['3:00 PM', '5:30 PM', 'DEEJ FK & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'TBA']] },
  { date: '2026-10-15', dayLabel: 'Thursday • October 15', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-10-16', dayLabel: 'Friday • October 16', acts: [['6:00 PM', '8:30 PM', 'PARISH LINE'], ['9:00 PM', '11:30 PM', 'CAESAR BROS']] },
  { date: '2026-10-17', dayLabel: 'Saturday • October 17', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'SUGAR & THE DADDIES'], ['9:00 PM', '11:30 PM', 'TAMARIE T PLAYMATZ']] },
  { date: '2026-10-18', dayLabel: 'Sunday • October 18', acts: [['3:00 PM', '5:30 PM', 'DEEJ FK & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'ANDRE LOVETT BAND']] },
  { date: '2026-10-22', dayLabel: 'Thursday • October 22', acts: [['6:00 PM', '8:30 PM', 'MAURICE CADE & ESS'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-10-23', dayLabel: 'Friday • October 23', acts: [['6:00 PM', '8:30 PM', 'PARISH LINE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-10-24', dayLabel: 'Saturday • October 24', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'GABE STILLMAN'], ['9:00 PM', '11:30 PM', 'ESSENTIALS']] },
  { date: '2026-10-25', dayLabel: 'Sunday • October 25', acts: [['3:00 PM', '5:30 PM', 'DEEJ FK & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'TBA']] },
  { date: '2026-10-29', dayLabel: 'Thursday • October 29', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'KEEPING IT ROLLIN’ BRASS BAND']] },
  { date: '2026-10-30', dayLabel: 'Friday • October 30', acts: [['6:00 PM', '8:30 PM', 'MOTHER RUCKUS'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-10-31', dayLabel: 'Saturday • October 31', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', '(SUGAR)((RONIGER)(ADO)'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
] as const;

export const schedule: ScheduleItem[] = schedule2026.flatMap((day) =>
  day.acts.map((act, actIndex): ScheduleItem => ({
    id: `bmc-${day.date}-${actIndex + 1}`,
    date: day.date,
    dayLabel: day.dayLabel,
    startTime: act[0],
    endTime: act[1],
    title: act[2],
    sourceIds: ['website-shows', 'management-schedule-2026-09-28'],
  })),
);
