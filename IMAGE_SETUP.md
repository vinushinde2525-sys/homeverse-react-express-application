# 📸 Image Setup

The project is configured so that `client/src/public/` is Vite's static folder.

## Where to put your images

```
homeverse-app/
└── client/
    └── src/
        └── public/
            └── assets/
                └── images/    ← PUT YOUR IMAGES HERE
                    ├── logo.png
                    ├── logo-light.png
                    ├── hero-banner.png
                    ├── about-banner-1.png
                    ├── about-banner-2.jpg
                    ├── property-1.jpg
                    ├── property-2.jpg
                    ├── property-3.jpg
                    ├── property-4.png
                    ├── service-1.png
                    ├── service-2.png
                    ├── service-3.png
                    ├── blog-1.png
                    ├── blog-2.jpg
                    ├── blog-3.jpg
                    └── author.jpg
```

## If you already put images in client/src/public/ (no subfolder)

Run this from the project root to move them:
```bash
mkdir -p client/src/public/assets/images
mv client/src/public/*.png client/src/public/*.jpg client/src/public/assets/images/ 2>/dev/null
```

## How it works

`vite.config.js` sets `publicDir: 'src/public'`, so everything in
`client/src/public/` is served at the root URL automatically.

`client/src/public/assets/images/hero-banner.png`
→ served at `/assets/images/hero-banner.png`
→ matches `src="/assets/images/hero-banner.png"` in the code ✅
