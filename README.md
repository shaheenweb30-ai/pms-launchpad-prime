# PropertyFlow

A modern property management system built with React, TypeScript, and Supabase. Manage properties, tenants, maintenance requests, rent collection, and more with a beautiful, intuitive interface.

## Features

- 🏢 **Property Management** - Manage multiple properties and units
- 👥 **Tenant Management** - Track tenants, leases, and payments
- 💰 **Rent Collection** - Automated rent tracking and payment processing
- 🔧 **Maintenance Requests** - Handle maintenance requests and work orders
- 💬 **Real-time Chat** - Communicate with tenants and vendors
- 📊 **Analytics & Reports** - Comprehensive reporting and analytics
- 🌐 **Multi-language Support** - English and Arabic (RTL) support
- 💱 **Multi-currency Support** - Support for 20+ currencies
- 🔐 **Role-based Access** - Admin, Homeowner, Tenant, and Vendor roles

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, Realtime)
- **Routing**: React Router DOM
- **Internationalization**: react-i18next
- **State Management**: React Query, Context API

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project

### Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/propertyflow.git
cd propertyflow
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Run database migrations:
```bash
# Apply migrations from supabase/migrations/
```

5. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## Project Structure

```
propertyflow/
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React contexts (Auth, Currency, etc.)
│   ├── hooks/          # Custom React hooks
│   ├── integrations/   # External service integrations
│   ├── lib/            # Utility functions and configurations
│   ├── pages/          # Page components
│   └── utils/          # Helper utilities
├── supabase/
│   └── migrations/     # Database migrations
└── public/             # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Deployment

The project is configured for deployment on Vercel. See `vercel.json` for configuration details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Support

For support, please open an issue in the GitHub repository.
