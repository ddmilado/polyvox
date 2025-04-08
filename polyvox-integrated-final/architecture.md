# PolyVoxAI Integrated Architecture Design

## Overview

The integrated PolyVoxAI platform will combine three existing components into a single cohesive SaaS application:
1. Landing Page (Next.js + Tailwind)
2. Translation App (Next.js + Supabase)
3. Crew AI Translation Engine (Python + OpenAI)

## Project Structure

```
polyvox-integrated/
├── app/                      # Next.js app directory
│   ├── (landing)/            # Landing page routes
│   │   ├── page.tsx          # Home page
│   │   ├── about/            # About page
│   │   ├── pricing/          # Pricing page
│   │   └── ...               # Other landing pages
│   ├── (auth)/               # Authentication routes
│   │   ├── login/            # Login page
│   │   ├── register/         # Registration page
│   │   └── ...               # Other auth pages
│   ├── (dashboard)/          # Protected app routes
│   │   ├── layout.tsx        # Dashboard layout with auth check
│   │   ├── page.tsx          # Dashboard home
│   │   ├── translate/        # Translation interface
│   │   ├── downloads/        # Downloads page
│   │   └── ...               # Other app pages
│   ├── api/                  # API routes
│   │   └── ...               # API endpoints
│   └── layout.tsx            # Root layout
├── components/               # Shared components
│   ├── landing/              # Landing page components
│   ├── dashboard/            # Dashboard components
│   ├── auth/                 # Auth components
│   └── ui/                   # UI components (from shadcn)
├── lib/                      # Shared utilities
│   ├── supabase/             # Supabase client
│   └── utils.ts              # Utility functions
├── public/                   # Static assets
├── styles/                   # Global styles
├── supabase/                 # Supabase configuration
│   ├── functions/            # Edge functions
│   │   └── translate/        # Translation function
│   │       ├── index.ts      # Function entry point
│   │       └── translator.py # Python translation module
│   └── migrations/           # Database migrations
└── ...                       # Configuration files
```

## Authentication Flow

1. User visits landing page
2. User clicks "Sign Up" or "Login" button
3. User is directed to authentication page
4. After successful authentication, user is redirected to dashboard
5. All dashboard routes are protected and require authentication

## Document Translation Flow

1. **Upload**:
   - User uploads document through the dashboard interface
   - Document is stored in Supabase storage bucket (`documents`)
   - Entry is created in `translations` table with status "pending"

2. **Processing**:
   - Frontend triggers Supabase edge function with document ID
   - Edge function updates status to "processing"
   - Edge function downloads document from storage
   - Edge function invokes Python translator module
   - Translator processes document using Crew AI with OpenAI integration
   - Translated document is uploaded to Supabase storage bucket (`translations`)
   - Status is updated to "completed" with reference to translated file

3. **Download**:
   - User views completed translations in downloads page
   - User can download translated documents
   - Translation history is maintained in the user's account

## Database Schema

### Users Table
- Managed by Supabase Auth

### Translations Table
```sql
create table translations (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  source_file_id text not null,
  source_language text not null,
  target_language text not null,
  status text not null default 'pending',
  translated_file_path text,
  error text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

## Storage Buckets

1. **documents**: For storing source documents
   - Access: Private, authenticated users can upload
   - Organization: `{user_id}/{document_id}.{extension}`

2. **translations**: For storing translated documents
   - Access: Private, authenticated users can download their own documents
   - Organization: `{user_id}/{translation_id}.{extension}`

## Supabase Edge Function

The edge function will:
1. Receive document ID from frontend
2. Retrieve translation job details from database
3. Download source document from storage
4. Process translation using Python module
5. Upload translated document to storage
6. Update translation status in database

## Integration with Crew AI

The Python translator module will:
1. Be adapted to run in Supabase edge function environment
2. Use OpenAI API for translation via Crew AI framework
3. Process documents based on source and target languages
4. Return translated content to edge function

## UI/UX Design

1. **Landing Page**:
   - Modern, visually appealing design
   - Clear value proposition
   - Features and benefits section
   - Pricing information
   - Call-to-action buttons for sign-up

2. **Dashboard**:
   - Clean, intuitive interface
   - Sidebar navigation
   - Translation form with language selection
   - Document upload with progress indicator
   - Translation history with status indicators

3. **Downloads Page**:
   - List of completed translations
   - Download buttons
   - Filter and search functionality
   - Translation details (date, languages, etc.)

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Supabase (Auth, Storage, Database)
- **Edge Functions**: Deno, TypeScript
- **Translation Engine**: Python, Crew AI, OpenAI
- **Deployment**: Vercel (Frontend), Supabase (Backend)
