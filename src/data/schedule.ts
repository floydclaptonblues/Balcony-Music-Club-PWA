import type { ScheduleItem } from './types';

// August 2026 management schedule, mirrored to the public UpcomingShows calendar.
// Guest-facing views filter this list to current/future dates.

const august2026 = [
  { date: '2026-08-01', dayLabel: 'Saturday • August 1', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', 'T MARIE & BAYOU JUJU'], ['9:00 PM', '11:30 PM', 'ADO SOUL & THE TRIBE']] },
  { date: '2026-08-02', dayLabel: 'Sunday • August 2', acts: [['3:00 PM', '5:30 PM', 'SIERRA & GREEN NOTES'], ['6:00 PM', '8:30 PM', 'TROPICAL WEATHER'], ['9:00 PM', '11:30 PM', 'SHORTY AND THE GIANTS']] },
  { date: '2026-08-06', dayLabel: 'Thursday • August 6', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'MAURICE CADE & ESS']] },
  { date: '2026-08-07', dayLabel: 'Friday • August 7', acts: [['6:00 PM', '8:30 PM', "WOODY'S RAMPAGE"], ['9:00 PM', '11:30 PM', 'KIM IN THE WIND BAND']] },
  { date: '2026-08-08', dayLabel: 'Saturday • August 8', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'RUMPSHAKERS'], ['9:00 PM', '11:30 PM', 'THEE FONK JAM feat. TamarieT']] },
  { date: '2026-08-09', dayLabel: 'Sunday • August 9', acts: [['3:00 PM', '5:30 PM', 'DEEJ FLAVA & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'SUGAR & THE DADDIES'], ['9:00 PM', '11:30 PM', 'SHORTY AND THE GIANTS']] },
  { date: '2026-08-13', dayLabel: 'Thursday • August 13', acts: [['6:00 PM', '8:30 PM', 'FUNKY SOLES'], ['9:00 PM', '11:30 PM', 'LEROY MARSHALL BAND']] },
  { date: '2026-08-14', dayLabel: 'Friday • August 14', acts: [['6:00 PM', '8:30 PM', 'PARISH LINE'], ['9:00 PM', '11:30 PM', 'ASHLEY PAIGE & SOULCIAL CLUB']] },
  { date: '2026-08-15', dayLabel: 'Saturday • August 15', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'SUGAR & THE DADDIES'], ['9:00 PM', '11:30 PM', 'ADO SOUL & THE TRIBE']] },
  { date: '2026-08-16', dayLabel: 'Sunday • August 16', acts: [['3:00 PM', '5:30 PM', 'SIERRA & GREEN NOTES'], ['6:00 PM', '8:30 PM', 'ELECTRIC BARREL HOUSE'], ['9:00 PM', '11:30 PM', 'MOTHER RUCKUS']] },
  { date: '2026-08-20', dayLabel: 'Thursday • August 20', acts: [['6:00 PM', '8:30 PM', 'DAPPER DANDIES'], ['9:00 PM', '11:30 PM', 'MAURICE CADE & ESS']] },
  { date: '2026-08-21', dayLabel: 'Friday • August 21', acts: [['6:00 PM', '8:30 PM', 'JOSH BENITEZ BAND'], ['9:00 PM', '11:30 PM', 'BIG MIKE & THE R&B KINGS']] },
  { date: '2026-08-22', dayLabel: 'Saturday • August 22', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', 'RUMPSHAKERS'], ['9:00 PM', '11:30 PM', 'R&R SMOKING FOUNDATION']] },
  { date: '2026-08-23', dayLabel: 'Sunday • August 23', acts: [['3:00 PM', '5:30 PM', 'DEEJ FLAVA & MOTHER RUCKUS'], ['6:00 PM', '8:30 PM', 'SUGAR & THE DADDIES'], ['9:00 PM', '11:30 PM', 'SHORTY AND THE GIANTS']] },
  { date: '2026-08-27', dayLabel: 'Thursday • August 27', acts: [['6:00 PM', '8:30 PM', 'FUNKY SOLES'], ['9:00 PM', '11:30 PM', 'MAURICE CADE & ESS']] },
  { date: '2026-08-28', dayLabel: 'Friday • August 28', acts: [['6:00 PM', '8:30 PM', 'ELECTRIC BARREL HOUSE'], ['9:00 PM', '11:30 PM', 'BIG MIKE & THE R&B KINGS']] },
  { date: '2026-08-29', dayLabel: 'Saturday • August 29', acts: [['3:00 PM', '5:30 PM', 'ANDRE LOVETT BAND'], ['6:00 PM', '8:30 PM', 'SUGAR & THE DADDIES'], ['9:00 PM', '11:30 PM', 'PIANO MAN G']] },
  { date: '2026-08-30', dayLabel: 'Sunday • August 30', acts: [['3:00 PM', '5:30 PM', 'TROPICAL WEATHER'], ['6:00 PM', '8:30 PM', 'LYNN DRURY'], ['9:00 PM', '11:30 PM', 'MOTHER RUCKUS']] },
] as const;

export const schedule: ScheduleItem[] = august2026.flatMap((day, dayIndex) =>
  day.acts.map((act, actIndex): ScheduleItem => ({
    id: `aug-2026-${String(dayIndex + 1).padStart(2, '0')}-${actIndex + 1}`,
    date: day.date,
    dayLabel: day.dayLabel,
    startTime: act[0],
    endTime: act[1],
    title: act[2],
    sourceIds: ['website-shows'],
  })),
);
