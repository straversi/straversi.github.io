# City Guesser

A static city guessing page. It uses local MapLibre GL files, Esri World Imagery
raster tiles, and preprocessed GeoNames city data, so there is no build step.

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

City data comes from GeoNames `cities15000.zip` and `countryInfo.txt`, licensed under
Creative Commons Attribution 4.0.

codex resume 019f44ea-502b-7b63-b6dd-5fcd999571be