# Band Image Assets

Drop the uploaded headliner images into this folder using these exact filenames:

- `andre-lovett-band.jpg`
- `ashley-paige-soulcial-club.jpg`
- `dapper-dandies.jpg`
- `maurice-cade-ess.jpg`
- `mother-ruckus.jpg`
- `sugar-and-the-daddies.jpg`
- `woodys-rampage.jpg`
- `big-mike-rb-kings.webp`
- `sierra-green.jpg`
- `kim-in-the-wind.webp`
- `kat-kiley-experience.webp`

The app is wired through `assets/bot/management-schedule-patch.js` to show only the headlining act in the main weekly panel and only headlining acts in the full schedule pop-up. Missing image files will fail silently and leave the text-only headliner card intact.