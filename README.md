<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1rD-i7Y3xPWVzoHw9SZNx9SYmd2m7Tfi4

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Deploy to GitHub Pages

- Set the base path so assets work under your repo URL. Create .env.production with:

  VITE_BASE=/REPO_NAME/

  Replace REPO_NAME with your repository name (omit for user/organization site repos).

- Build and publish to the gh-pages branch:

  npm run deploy

This build also writes dist/404.html (copy of index.html) so deep links work if you ever switch away from hash routing.
