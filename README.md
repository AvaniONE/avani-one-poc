# Avani ONE™ animated proof of concept

A static, responsive, scroll-driven webpage created for GitHub Pages. It uses only HTML, CSS, and JavaScript, with no backend or build process.

## Publish on GitHub Pages

1. Create a new public GitHub repository, such as `avani-one-poc`.
2. Choose **Add file → Upload files**.
3. Upload the contents of this folder. Upload the files themselves, not the ZIP file.
4. Commit the files to the `main` branch.
5. Open **Settings → Pages**.
6. Under **Build and deployment**, select **Deploy from a branch**.
7. Choose `main` and `/ (root)`, then save.
8. GitHub will provide a URL similar to `https://username.github.io/avani-one-poc/`.

## Preview locally

Double-click `index.html`, or run a simple local server:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Edit content

- Page copy and product names: `index.html`
- Colors and layout: the variables at the top of `styles.css`
- Scroll behavior and background animation: `script.js`
- Official Avani Media logo and wave artwork: `assets/`

## Brand foundation used

- Primary ink: `#0D1B2A`
- Secondary navy: `#132D4A`
- Avani blue: `#348BE9`
- White: `#FCFCFC`
- Typeface: Roboto, with Arial fallback

## Notes

- The Google Fonts link requires internet access. The Arial fallback keeps the page functional if the font cannot load.
- The page honors the visitor's reduced-motion accessibility preference.
- No form, analytics, cookies, database, or third-party animation library is included.
