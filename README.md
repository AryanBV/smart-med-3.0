# SMART_MED_3.0

A streamlined diabetes management system built with Next.js, tRPC, Prisma, and TypeScript.

## Features

- User authentication and profile management
- Health metrics tracking for diabetes patients
- Document management with OCR capabilities
- Family health visualization
- Dashboard and reporting

## Tech Stack

- **Frontend:** Next.js 14+, React, TypeScript, Tailwind CSS, shadcn/ui
- **State Management:** React Query, Zustand
- **Backend:** tRPC, Express.js
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Document Processing:** Tesseract.js (planned)

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
   \\\ash
   git clone https://github.com/yourusername/smart-med-3.0.git
   cd smart-med-3.0
   \\\

2. Install dependencies
   \\\ash
   npm install
   \\\

3. Set up environment variables
   \\\ash
   cp .env.example .env
   # Update the .env file with your database credentials and NextAuth secret
   \\\

4. Run database migrations
   \\\ash
   npx prisma migrate dev
   \\\

5. Start the development server
   \\\ash
   npm run dev
   \\\

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

\\\
src/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/              # Utility functions and configuration
├── server/           # tRPC server and API routes
├── providers/        # React context providers
└── store/            # Zustand stores
prisma/
└── schema.prisma     # Database schema
\\\

## Development Approach

1. Feature-based organization
2. TypeScript-first with strong typing
3. Clean, maintainable code over complex optimizations
4. Server components where appropriate for performance

## License

[MIT](LICENSE)
