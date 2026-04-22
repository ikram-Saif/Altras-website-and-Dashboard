# Altras

Altras is an Angular 11 web application for a money transfer service. It includes public marketing pages, legal pages, user authentication, a protected customer dashboard, transfer tools, receiver management, branch locations, help content, document upload, inbox, and profile management.

## Key features

- Public landing pages: home, about, contact, branches, calculate, and legal policies
- User authentication: login, registration, forgot password, reset password
- Protected dashboard features behind `AuthGuard`
- Dashboard sections: send money, today rate, inbox, profile, upload documents, add receiver, delivery address, branches, transactions, and receivers
- Notifications and alerts with Toastr and SweetAlert2
- Modals for transaction details, receiver details, and profile editing
- Google Maps support via `@agm/core` for branch location display
- File upload support using `angular-file-uploader`

## Prerequisites

- Node.js (recommended 12.x or 14.x for Angular 11 compatibility)
- npm
- Angular CLI installed globally if you want to use `ng` commands directly: `npm install -g @angular/cli`

## Installation

1. Open a terminal in the project root.
2. Install dependencies:

```bash
npm install
```

3. After install, Angular compatibility compilation runs automatically via the `postinstall` script.

## Development

Start the development server with:

```bash
npm start
```

Then open `http://localhost:4200/` in your browser. The application reloads automatically when source files change.

## Build

Build the application for production with:

```bash
npm run build
```

The build output is placed in the `dist/` folder.

## Testing

Run unit tests with Karma:

```bash
npm test
```

Run end-to-end tests with Protractor:

```bash
npm run e2e
```

## Project structure

- `src/app/` - main application code
- `src/app/app.module.ts` - root module and imports
- `src/app/app-routing.module.ts` - route definitions and protected dashboard routes
- `src/app/services/` - service layer for API calls, storage, auth, and application logic
- `src/app/components/` - reusable UI components
- `src/app/*` - feature components such as dashboard, login, registration, profile, inbox, and help
- `src/assets/` - static assets
- `src/environments/` - environment configuration files

## Routes

Public routes include:

- `/` - Home
- `/about` - About
- `/calculate` - Calculator
- `/contact` - Contact Us
- `/branches` - Branch Locations
- `/privacy-policy` - Privacy Policy
- `/terms-of-use` - Terms of Use
- `/login` - Login
- `/registeration` - Registration
- `/forgot-password` - Forgot Password
- `/reset-password` - Reset Password

Protected dashboard routes require authentication:

- `/dashboard`
- `/dashboard/send-money`
- `/dashboard/today-rate`
- `/dashboard/inbox`
- `/dashboard/profile`
- `/dashboard/upload-documents`
- `/dashboard/add-receiver`
- `/dashboard/help`
- `/dashboard/delivary-address`
- `/dashboard/branches`
- `/dashboard/transactions`
- `/dashboard/receivers`

## Notes

- The project uses environment variable `NODE_OPTIONS=--openssl-legacy-provider` in npm scripts for compatibility with older Node/OpenSSL combinations.
- `AgmCoreModule` is configured with a Google Maps API key in `src/app/app.module.ts`; replace it with a secure key if needed.
- The repository is configured for Angular 11 and may require dependency updates before upgrading to newer Angular versions.
