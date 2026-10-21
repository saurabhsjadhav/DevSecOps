# Jadhav Journal - personal blog

A premium, fully responsive personal blog with a WebGL 3D hero (Three.js), tilt-3D spotlight post cards,
generated HD cover art, a reader view with next/previous, search and filters, a live "Now" bento,
projects, a journey timeline, light/dark theme, custom cursor and scroll effects.

## Run it
Open `index.html` in a browser (needs internet for fonts and Three.js from CDNs).
For a local server: `python3 -m http.server 8000` then visit http://localhost:8000

## Make it yours
- `js/main.js` -> edit the `POSTS` array (title, category, date, text). Set `img: 'images/photo.jpg'` to use a real photo instead of the generated cover.
- `index.html` -> change the name, About text, Projects, Journey steps and social links.
- `css/style.css` -> colors are tokens at the top (`--accent`, `--cool`, `--bg` ...). Light and dark are both defined.
- The newsletter form is a demo. Connect Mailchimp, Buttondown or ConvertKit to collect real emails.

## Deploy free
Drag the folder onto Netlify Drop, or push to GitHub and enable GitHub Pages.
