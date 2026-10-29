import type { ScheduleItem } from './types';

// October 2026: original 47 slots; November 2026: 41 slots on 16 show dates.
// November 26 CLOSED for Thanksgiving; November 28 at 9 PM remains TBD.
// November artist billings provided by owner October 29, 2026, preserved verbatim.
// End times are inherited 2.5-hour calendar conventions, not newly confirmed set lengths.
// America/Chicago. Mirrored from UpcomingShows/shows.json. Historical records preserved.

const schedule2026 = [
  { date: '2026-10-01', dayLabel: 'Thursday • October 1', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-10-02', dayLabel: 'Friday • October 2', acts: [['6:00 PM', '8:30 PM', 'ELECTRIC BARRELHOUSE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-10-03', dayLabel: 'Saturday • October 3', acts: [['3:00 PM', '5:30 PM', 'PARISH LINE'], ['6:00 PM', '8:30 PM', 'JOSH BENITEZ BAND'], ['9:00 PM', '11:30 PM', 'ANDRE LOVETT BAND']] },
  { date: '2026-10-04', dayLabel: 'Sunday • October 4', acts: [['3:00 PM', '5:30 PM', 'DEEJ FK & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'ARMANI SMITH']] },
  { date: '2026-10-08', dayLabel: 'Thursday • October 8', acts: [['6:00 PM', '8:30 PM', 'MAURICE CADE & ESS'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-10-09', dayLabel: 'Friday • October 9', acts: [['6:00 PM', '8:30 PM', 'ELECTRIC BARRELHOUSE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-10-10', dayLabel: 'Saturday • October 10', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'TBA'], ['9:00 PM', '11:30 PM', 'KEEP IT ROLLING BRASS BAND']] },
  { date: '2026-10-11', dayLabel: 'Sunday • October 11', acts: [['3:00 PM', '5:30 PM', 'DEEJ FK & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'KIM IN THE WIND']] },
  { date: '2026-10-15', dayLabel: 'Thursday • October 15', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-10-16', dayLabel: 'Friday • October 16', acts: [['6:00 PM', '8:30 PM', 'PARISH LINE'], ['9:00 PM', '11:30 PM', 'CAESAR BROS']] },
  { date: '2026-10-17', dayLabel: 'Saturday • October 17', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'SUGAR & THE DADDIES'], ['9:00 PM', '11:30 PM', 'TAMARIE T PLAYMATZ']] },
  { date: '2026-10-18', dayLabel: 'Sunday • October 18', acts: [['3:00 PM', '5:30 PM', 'DEEJ FK & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'ANDRE LOVETT BAND']] },
  { date: '2026-10-22', dayLabel: 'Thursday • October 22', acts: [['6:00 PM', '8:30 PM', 'MAURICE CADE & ESS'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-10-23', dayLabel: 'Friday • October 23', acts: [['6:00 PM', '8:30 PM', 'PARISH LINE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-10-24', dayLabel: 'Saturday • October 24', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'GABE STILLMAN'], ['9:00 PM', '11:30 PM', 'ESSENTIALS']] },
  { date: '2026-10-25', dayLabel: 'Sunday • October 25', acts: [['3:00 PM', '5:30 PM', 'DEEJ FK & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'FUNKY SOLES']] },
  { date: '2026-10-29', dayLabel: 'Thursday • October 29', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'KEEP IT ROLLING BRASS BAND']] },
  { date: '2026-10-30', dayLabel: 'Friday • October 30', acts: [['6:00 PM', '8:30 PM', 'MOTHER RUCKUS'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-10-31', dayLabel: 'Saturday • October 31', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'Epic Funk Brass Band'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-11-01', dayLabel: 'Sunday • November 1', acts: [['3:00 PM', '5:30 PM', 'DEEJ FLAVA & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'ANDRE LOVETT BAND']] },
  { date: '2026-11-05', dayLabel: 'Thursday • November 5', acts: [['6:00 PM', '8:30 PM', 'RUMPSHAKERS'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-11-06', dayLabel: 'Friday • November 6', acts: [['6:00 PM', '8:30 PM', 'ELECTRIC BARRELHOUSE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-11-07', dayLabel: 'Saturday • November 7', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', 'MAURICE CADE & ESS'], ['9:00 PM', '11:30 PM', 'KEEPING IT ROLLING BRASS BAND']] },
  { date: '2026-11-08', dayLabel: 'Sunday • November 8', acts: [['3:00 PM', '5:30 PM', 'DEEJ FLAVA & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'FUNKY SOLES']] },
  { date: '2026-11-12', dayLabel: 'Thursday • November 12', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-11-13', dayLabel: 'Friday • November 13', acts: [['6:00 PM', '8:30 PM', 'PARISH LINE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-11-14', dayLabel: 'Saturday • November 14', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'JON RONIGER'], ['9:00 PM', '11:30 PM', 'ANDRE LOVETT BAND']] },
  { date: '2026-11-15', dayLabel: 'Sunday • November 15', acts: [['3:00 PM', '5:30 PM', 'DEEJ FLAVA & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'FUNKY SOLES']] },
  { date: '2026-11-19', dayLabel: 'Thursday • November 19', acts: [['6:00 PM', '8:30 PM', 'ANDY J FORREST'], ['9:00 PM', '11:30 PM', 'KAT KILEY EXPERIENCE']] },
  { date: '2026-11-20', dayLabel: 'Friday • November 20', acts: [['6:00 PM', '8:30 PM', 'PARISH LINE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & RB KINGS']] },
  { date: '2026-11-21', dayLabel: 'Saturday • November 21', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', 'BEBE & THE STANDARDS'], ['9:00 PM', '11:30 PM', 'TAMARIE T & THEE FUNK JAM']] },
  { date: '2026-11-22', dayLabel: 'Sunday • November 22', acts: [['3:00 PM', '5:30 PM', 'DEEJ FLAVA & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'FUNKY SOLES']] },
  { date: '2026-11-26', dayLabel: 'Thursday • November 26', acts: [], closed: true, notice: 'CLOSED FOR THANKSGIVING — no performances scheduled.' },
  { date: '2026-11-27', dayLabel: 'Friday • November 27', acts: [['6:00 PM', '8:30 PM', 'ELECTRIC BARRELHOUSE'], ['9:00 PM', '11:30 PM', 'ADO SOUL']] },
  { date: '2026-11-28', dayLabel: 'Saturday • November 28', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', 'MAURICE CADE & ESS'], ['9:00 PM', '11:30 PM', 'TBD']] },
  { date: '2026-11-29', dayLabel: 'Sunday • November 29', acts: [['3:00 PM', '5:30 PM', 'DEEJ FLAVA & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'JAM BRASS BAND'], ['9:00 PM', '11:30 PM', 'KIM INDA WIND BAND']] },
] as const;

export const schedule: ScheduleItem[] = schedule2026.flatMap((day) =>
  day.acts.map((act, actIndex): ScheduleItem => ({
    id: `bmc-${day.date}-${actIndex + 1}`,
    date: day.date,
    dayLabel: day.dayLabel,
    startTime: act[0],
    endTime: act[1],
    title: act[2],
    sourceIds: [
      'website-shows',
      'management-schedule-2026-10-01',
      ...(day.date === '2026-10-31' && act[0] === '6:00 PM' ? ['site-owner-supplied-2026-10-27' as const] : []),
      ...(day.date.startsWith('2026-11-') ? ['site-owner-supplied-2026-10-29' as const] : []),
    ],
  })),
);
