# House of Furniture - ERP Management System

A comprehensive Enterprise Resource Planning (ERP) system built specifically for furniture retail and manufacturing businesses.

## 🚀 Features

### Core Modules

- **Dashboard** - Real-time overview with sales charts, inventory summaries, and key metrics
- **Items Management** - Complete furniture inventory tracking with locations and stock alerts
- **Customer Management** - Customer database with purchase history and VIP tracking
- **HR Management** - Employee records, payroll, and department tracking
- **Production Management** - Production cost tracking (materials, labor, overhead) with progress monitoring
- **POS System** - Full point-of-sale interface for in-store transactions
- **Finance** - Financial reporting, invoices, expenses, and cash flow analysis
- **Settings** - System configuration and preferences

## 🎨 Design

- Custom brand colors: Orange (#F5954A) and Dark Blue (#0A2540)
- Responsive design with Tailwind CSS v4
- Modern UI components from shadcn/ui
- Dark sidebar with branded logo

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn package manager

## 🛠️ Installation

1. **Clone or create the project directory**
   ```bash
   mkdir house-of-furniture-erp
   cd house-of-furniture-erp
   ```

2. **Copy all project files** from the current structure into your project directory

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Add the logo image**
   - Replace the logo path in `/components/Sidebar.tsx` with your actual logo
   - Currently using: `figma:asset/fb06ce7f8f36f24aee1980d2968cd46d70b0e5ce.png`
   - Update to: `import logo from './assets/logo.png'`

## 🏃 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
house-of-furniture-erp/
├── src/
│   ├── App.tsx                 # Main application component
│   ├── main.tsx               # Application entry point
│   ├── components/
│   │   ├── Sidebar.tsx        # Navigation sidebar
│   │   ├── Dashboard.tsx      # Dashboard module
│   │   ├── Inventory.tsx      # Inventory management
│   │   ├── Customers.tsx      # Customer management
│   │   ├── HR.tsx            # HR management
│   │   ├── Production.tsx    # Production cost tracking
│   │   ├── POS.tsx           # Point of Sale system
│   │   ├── Finance.tsx       # Finance module
│   │   ├── Settings.tsx      # Settings module
│   │   └── ui/               # Reusable UI components
│   ├── styles/
│   │   └── globals.css       # Global styles and Tailwind config
│   └── assets/               # Images and static files
├── public/                    # Public static files
├── index.html                # HTML entry point
├── package.json              # Dependencies and scripts
├── tsconfig.json             # TypeScript configuration
└── vite.config.ts            # Vite configuration
```

## 🔧 Configuration Files Needed

### vite.config.ts
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### index.html
```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>House of Furniture - ERP System</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### src/main.tsx
```typescript
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

## 🎯 Key Features by Module

### Dashboard
- Revenue and order metrics
- Furniture category overview
- Sales charts and graphs
- Production summary

### Inventory Management
- Stock tracking with locations
- Low stock alerts
- Reorder level management
- Inventory valuation

### Customer Management
- Customer database
- Contact information
- Purchase history
- VIP customer tracking

### HR Management
- Employee records
- Department organization
- Salary tracking
- Employee status management

### Production Management
- Production order tracking
- Cost breakdown (materials, labor, overhead)
- Progress monitoring
- Cost analysis charts

### POS System
- Product catalog with search
- Shopping cart functionality
- Multiple payment methods
- Real-time total calculation

### Finance
- Cash flow analysis
- Invoice management
- Expense tracking
- Financial reports

## 🎨 Customization

### Brand Colors
Colors are defined in `/styles/globals.css`:
- Primary: `#F5954A` (Orange)
- Secondary: `#0A2540` (Dark Blue)
- Accent: `#FFF3E6` (Light Orange)

### Logo
Replace the logo import in `/components/Sidebar.tsx` with your actual logo file.

## 📊 Mock Data

The application currently uses mock data for demonstration. To connect to a real backend:

1. Create API service files in `src/services/`
2. Replace mock data with API calls
3. Add state management (Redux, Zustand, or Context API)
4. Implement authentication

## 🔐 Security Considerations

- Implement proper authentication
- Add role-based access control
- Secure API endpoints
- Validate all user inputs
- Use environment variables for sensitive data

## 🚀 Deployment

### Netlify / Vercel
```bash
npm run build
# Deploy the 'dist' folder
```

### Docker
Create a `Dockerfile` in the root:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

## 📝 Development Roadmap

- [ ] Connect to real database (PostgreSQL, MySQL, or MongoDB)
- [ ] Implement user authentication
- [ ] Add role-based permissions
- [ ] Create backend API (Node.js/Express or similar)
- [ ] Add report generation (PDF export)
- [ ] Implement email notifications
- [ ] Add data export/import functionality
- [ ] Create mobile responsive views
- [ ] Add real-time updates with WebSockets
- [ ] Implement barcode scanning for POS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 💡 Support

For support, email support@houseoffurniture.com or open an issue in the repository.

## 🙏 Acknowledgments

- Built with React + TypeScript + Vite
- UI Components from shadcn/ui
- Icons from Lucide React
- Charts from Recharts
- Styling with Tailwind CSS v4

---

**Made with ❤️ for House of Furniture**
