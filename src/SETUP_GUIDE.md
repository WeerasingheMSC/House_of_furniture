# Setup Guide - House of Furniture ERP

## Quick Start Guide

### Step 1: Prerequisites
Ensure you have installed:
- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager (comes with Node.js)
- **Git** (optional) - [Download here](https://git-scm.com/)

### Step 2: Project Setup

1. **Create project directory**
   ```bash
   mkdir house-of-furniture-erp
   cd house-of-furniture-erp
   ```

2. **Initialize the project structure**
   
   Create the following folder structure:
   ```
   house-of-furniture-erp/
   ├── public/
   ├── src/
   │   ├── components/
   │   │   ├── ui/
   │   │   └── figma/
   │   ├── styles/
   │   └── assets/
   ```

3. **Copy all files** from the current project into their respective folders:
   - Copy all `.tsx` files from `/components/` to `src/components/`
   - Copy all UI components to `src/components/ui/`
   - Copy `App.tsx` to `src/App.tsx`
   - Copy `globals.css` to `src/styles/globals.css`
   - Copy configuration files (package.json, tsconfig.json, etc.) to root

### Step 3: Update File Paths

Since we're moving to a standard Vite structure, update import paths in your files:

**In all component files**, change imports from:
```typescript
import { Component } from "./components/Component";
```
to:
```typescript
import { Component } from "../components/Component"; // or appropriate relative path
```

**In App.tsx**, change imports from:
```typescript
import { Sidebar } from "./components/Sidebar";
```
to:
```typescript
import { Sidebar } from "./components/Sidebar"; // keep as is if App.tsx is in src/
```

### Step 4: Handle the Logo

The logo import in `Sidebar.tsx` needs to be updated:

**Current (Figma asset):**
```typescript
import logoImage from "figma:asset/fb06ce7f8f36f24aee1980d2968cd46d70b0e5ce.png";
```

**Update to (local asset):**
```typescript
import logoImage from "../assets/logo.png";
```

Then place your logo file at: `src/assets/logo.png`

### Step 5: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS v4
- Radix UI components
- Lucide React icons
- Recharts
- And all other dependencies

### Step 6: Run the Development Server

```bash
npm run dev
```

The application should now be running at `http://localhost:5173`

## Common Issues and Solutions

### Issue 1: Module not found errors

**Problem:** Import errors for components
```
Cannot find module './components/ui/button'
```

**Solution:** Check that:
1. All UI component files are in `src/components/ui/`
2. Import paths are relative to the current file
3. File extensions match (`.tsx` for TypeScript React)

### Issue 2: Logo not displaying

**Problem:** Logo image not showing in sidebar

**Solution:**
1. Save your logo to `src/assets/logo.png`
2. Update import in `Sidebar.tsx`:
   ```typescript
   import logoImage from "../assets/logo.png";
   ```

### Issue 3: Tailwind styles not working

**Problem:** Styles not applying

**Solution:**
1. Ensure `globals.css` is imported in `main.tsx`
2. Check that Tailwind CSS v4 is installed
3. Verify the CSS file path is correct

### Issue 4: TypeScript errors

**Problem:** TypeScript compilation errors

**Solution:**
1. Check `tsconfig.json` is properly configured
2. Run `npm install` to ensure all type definitions are installed
3. Restart your IDE/editor

## File Structure After Setup

```
house-of-furniture-erp/
├── node_modules/              # Dependencies (created after npm install)
├── public/                    # Static files
│   └── favicon.ico
├── src/
│   ├── assets/               # Images, fonts, etc.
│   │   └── logo.png
│   ├── components/
│   │   ├── figma/
│   │   │   └── ImageWithFallback.tsx
│   │   ├── ui/               # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   └── ... (all other UI components)
│   │   ├── Sidebar.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Inventory.tsx
│   │   ├── Customers.tsx
│   │   ├── HR.tsx
│   │   ├── Production.tsx
│   │   ├── POS.tsx
│   │   ├── Finance.tsx
│   │   └── Settings.tsx
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── .env.example              # Environment variables template
├── .gitignore               # Git ignore file
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript config
├── tsconfig.node.json       # TypeScript config for Node
├── vite.config.ts           # Vite configuration
├── README.md                # Project documentation
└── SETUP_GUIDE.md          # This file

```

## Next Steps After Setup

1. **Test all modules**: Navigate through each module to ensure everything works
2. **Update mock data**: Replace with your actual data
3. **Add logo**: Replace with your actual House of Furniture logo
4. **Configure environment**: Copy `.env.example` to `.env` and update values
5. **Set up backend** (optional): Create API endpoints for data persistence
6. **Deploy**: Deploy to Netlify, Vercel, or your preferred hosting

## Build for Production

```bash
npm run build
```

This creates optimized production files in the `dist/` folder.

## Preview Production Build

```bash
npm run preview
```

## Deployment Options

### Option 1: Netlify
1. Push code to GitHub
2. Connect repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `dist`

### Option 2: Vercel
1. Push code to GitHub
2. Import project in Vercel
3. Vercel auto-detects Vite configuration
4. Deploy

### Option 3: Traditional Hosting
1. Run `npm run build`
2. Upload contents of `dist/` folder to your web server
3. Configure server to serve `index.html` for all routes

## Additional Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Shadcn UI Documentation](https://ui.shadcn.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Support

If you encounter issues:
1. Check this setup guide
2. Review the main README.md
3. Check component documentation
4. Open an issue on GitHub

---

**Happy coding! 🚀**
