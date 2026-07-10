# City Guesser

A static city guessing page. It uses local MapLibre GL files, Esri World Imagery
raster tiles, preprocessed GeoNames city data, and Natural Earth country
boundaries, so there is no build step.

Run it from the project root with any static server:

```sh
python3 -m http.server 5174 --bind 127.0.0.1
```

Then open:

```text
http://127.0.0.1:5174/
```

Opening `index.html` directly from the filesystem is not recommended because browser
module loading and `fetch()` are more reliable over HTTP.

Close-zoom imagery is loaded from Esri's public World Imagery tile service at runtime,
so the globe needs network access even though the app code and city data are local.

## City selection

Each round uses the currently filtered set of qualifying cities. The game first
chooses a random country from that set, then chooses a random qualifying city
within that country.

For the active filters, selected countries are tracked in a history set and are
not repeated until every qualifying country has been selected once. After that,
the history is cleared and a new country cycle begins. Changing filters or
resetting the game also clears the country history.

City data comes from GeoNames `cities15000.zip` and `countryInfo.txt`, licensed under
Creative Commons Attribution 4.0. Country boundaries come from Natural Earth
Admin 0 map units.
