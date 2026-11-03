# Gatherly — Event Management Website

A responsive event discovery and registration website built for the K Explore Web Designing task.

## Features
- Responsive homepage with hero, featured events, about section and newsletter area.
- Event cards with date, category, venue, image, description and pricing.
- Live search and category filters.
- Event detail dialog and registration form.
- JavaScript validation for name, email and phone number.
- Successful registration confirmation.
- Registration records saved in browser Local Storage.
- Dark/light mode and mobile navigation.
- Built with HTML5, CSS3 and vanilla JavaScript.

## Run locally
1. Download or clone this repository.
2. Open `index.html` in a modern browser.
3. No build tools or package installation are required.

## Registration data
Successful registrations are stored in the browser's Local Storage under the key `gatherlyRegistrations`. This is a front-end demonstration only; it does not send data to a server.

## Customisation
- Edit the `events` array in `script.js` to change event names, dates, venues, descriptions, categories, prices and images.
- Update colours and responsive styling in `style.css`.
- Update page content and layout in `index.html`.

## GitHub submission
```bash
git init
git add .
git commit -m "Build Gatherly event management website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

## Deployment
### GitHub Pages
1. Push the project to GitHub.
2. Open the repository's **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select `main` and `/ (root)`, then save.
5. Wait for the deployment URL to appear.

You can also deploy the folder using Netlify Drop or import the GitHub repository into Vercel.

## Notes
- Event content and imagery are sample/demo content.
- External Google Fonts and Unsplash images require an internet connection.
- Local Storage is browser-specific and is not a production registration database.
