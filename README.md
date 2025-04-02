# KoreanConvertor - Frontend

A Next.js application designed to help international students and expatriates find accommodation in South Korea, with a focus on the Keimyung University area in Daegu.

## 🌟 Features

- **User Authentication**
  - Secure login/register system
  - JWT token-based authentication with refresh tokens
  - User profile management

- **Accommodation Listings**
  - Create and manage accommodation listings
  - Upload multiple images for each property
  - Detailed property information including:
    - Monthly rent and security deposit in KRW
    - Location details
    - Room specifications (bedrooms, bathrooms)
    - Available amenities
    - House rules
    - Maximum guests and minimum stay requirements

- **Search & Discovery**
  - Browse available accommodations
  - View detailed property information
  - Image gallery with full-screen viewing capability
  - Location information

- **User Features**
  - Save favorite properties
  - Contact property owners/managers
  - Manage your own listings

## 🛠 Technical Stack

- **Frontend Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **HTTP Client**: Axios
- **Authentication**: JWT with refresh token mechanism
- **Image Handling**: Next.js Image optimization
- **Form Handling**: React forms with validation

## 🚀 Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file with the following variables:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## API

This application connects to an external API to fetch live conversion rates. The API endpoint and methods used include:

- **Conversion Endpoint**: Provides real-time conversion rates.
- **Method**: Uses GET requests to retrieve the latest conversion data.
- **Accommodation Endpoint**: Provides CRUD for users and accommodations

For details on the backend API, refer to the backend repository [here](https://github.com/Haetae-Daegu/kconvertor-server).

## 🚀 Deployment

Link of the deployed project : [https://haetaedaegu.vercel.app/](https://haetaedaegu.vercel.app/)

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and make a pull request with your changes. Be sure to follow our coding guidelines and keep changes concise and well-documented.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Useful Links

- **Backend Repository**: [KoreanConvertor Backend](https://github.com/Haetae-Daegu/kconvertor-server)
- **GitHub Profile**: [NicolasYapobi](https://github.com/NicolasYapobi)

