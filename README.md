# African and Pregnant Blog

A Next.js-based blog platform focused on providing information and support for African pregnant women.

## Features

- Modern, responsive design with Tailwind CSS
- Contact form with validation
- Secure file upload system
- Article management system
- Newsletter signup
- Patient stories
- Resource library

## Prerequisites

- Node.js >= 18.x
- npm >= 9.x

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with the following variables:
   ```
   # Add your environment variables here
   NEXT_PUBLIC_API_URL=your_api_url
   BLOB_READ_WRITE_TOKEN=your_blob_token
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   The application will be available at http://localhost:3002

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## Environment Variables

Create a `.env.local` file with the following variables:
```
# Add your environment variables here
NEXT_PUBLIC_API_URL=your_api_url

# Vercel Blob Storage (required for file uploads)
BLOB_READ_WRITE_TOKEN=your_blob_token
```

### Setting up Vercel Blob Storage

1. Go to your Vercel dashboard
2. Select your project
3. Go to the "Storage" tab
4. Click on "Connect Store" and select "Blob"
5. Follow the setup instructions
6. Copy the provided `BLOB_READ_WRITE_TOKEN`
7. Add it to your environment variables in the Vercel dashboard
8. Also add it to your local `.env.local` file for development

## Testing

The project uses Jest and React Testing Library for testing. Tests are located in `__tests__` directories next to the components they test.

To run tests:
```bash
npm run test
```

## Security

- All forms implement proper validation
- File uploads are restricted by size and type
- Virus scanning is implemented for file uploads
- CORS headers are properly configured
- API routes implement proper error handling

## Deployment

The project is configured for deployment on Vercel. Simply push to the main branch to trigger a deployment.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
