# Sri Sainath Nursery Website

A fast, mobile-first, professional business website redesign for **Sri Sainath Nursery**, located in Dharmavaram, Sri Sathya Sai District, Andhra Pradesh, India.

---

## 🌿 Features & Tech Stack

- **Tech Stack**: Pure HTML5, CSS3 (Vanilla CSS with variables), Vanilla JavaScript (No heavy frameworks or build tools).
- **Design System**:
  - Deep Green (`#2E7D32`) primary brand color
  - Light Green (`#E8F5E9`) soft background
  - Warm Golden Accent (`#F9A825`) CTA buttons
  - Google Fonts: `Poppins` (Headings) and `Inter` (Body text)
- **Key Sections**:
  1. Sticky Navigation Header with Mobile Drawer & Call Now Button
  2. Hero Section with quick CTA & trust indicators
  3. About Nursery section with key highlights grid
  4. Plants & Products grid with instant category filtering
  5. Interactive Image Lightbox Gallery
  6. Why Choose Us feature grid
  7. Contact section with details, embedded Google Map & pre-filled WhatsApp enquiry form
  8. Footer with copyright `© 2026 Sri Sainath Nursery`
  9. Floating WhatsApp CTA button on all pages

---

## 📁 Directory Structure

```
Sri Sainath Nursery/
├── index.html               # Main website single-page layout
├── README.md                # Project documentation & setup guide
└── assets/
    ├── css/
    │   └── styles.css       # Complete CSS design system & responsive rules
    ├── js/
    │   └── main.js          # Interactive features (filtering, lightbox, WhatsApp generator)
    └── images/
        └── favicon.svg      # Custom leaf SVG favicon
```

---

## 🛠️ How to Customize Contact Information & Images

### 1. Updating Contact Details & Phone Numbers
Search for the marked placeholder comments in `index.html` and `assets/js/main.js`:

- **Phone Number**: Replace `[PHONE NUMBER]` with your actual mobile number (e.g. `+91 94400 00000`) in `index.html`.
- **WhatsApp Number**: In `assets/js/main.js`, update line 7:
  ```javascript
  const NURSERY_CONFIG = {
    whatsappNumber: '919440000000', // Include country code 91 without spaces or +
    phoneNumber: '+919440000000',
    nurseryName: 'Sri Sainath Nursery'
  };
  ```
- **Address**: Replace `[FULL ADDRESS]` in `index.html` with your exact street address in Dharmavaram.
- **Email**: Replace `[EMAIL]` (e.g., `info@srisainathnursery.com`) in `index.html`.

### 2. Replacing Images
All images currently use high-resolution royalty-free plant photos from Unsplash.
To use your own nursery photos:
1. Save your custom images inside `assets/images/` (e.g., `hero.jpg`, `plant-mango.jpg`).
2. Update the `src` attribute of the corresponding `<img>` tag in `index.html`:
   ```html
   <img src="assets/images/hero.jpg" alt="Sri Sainath Nursery Dharmavaram">
   ```

---

## 🚀 Free Hosting & Deployment Options

### Option A: Deploy on Netlify (Recommended - Simplest)
1. Go to [Netlify Drop](https://app.netlify.com/drop).
2. Drag and drop the whole project folder (`Sri Sainath Nursery`).
3. Netlify will deploy your site instantly and provide a live URL!
4. (Optional) Connect your domain `srisainathnursery.com` in Netlify Domain Settings.

### Option B: Deploy on GitHub Pages
1. Create a repository on GitHub (e.g. `sri-sainath-nursery`).
2. Push all project files to the `main` branch.
3. Go to **Repository Settings** > **Pages**.
4. Set source to `Deploy from a branch`, select `main` / `/ (root)`, and click **Save**.
5. Your site will be live at `https://yourusername.github.io/sri-sainath-nursery/`.

### Option C: Deploy on Vercel
1. Install Vercel CLI (`npm i -g vercel`) or sign up at [vercel.com](https://vercel.com).
2. Run `vercel` in the project root directory.
3. Follow the CLI prompts to deploy in seconds.

---

## 📄 License & Credits

- Designed for **Sri Sainath Nursery**, Dharmavaram, AP.
- © 2026 Sri Sainath Nursery. All Rights Reserved.
