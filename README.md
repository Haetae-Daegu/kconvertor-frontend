# KoreanConvertor - Frontend

This project is the frontend application for converting currency between the South Korean Won (KRW) and the Euro (EUR), built with Next.js. It provides an intuitive user interface for real-time conversion and an option to view the history of conversions.

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) ![MIT License](https://img.shields.io/badge/License-MIT-blue.svg)

## Features

- **Currency Conversion**: Instantly convert between Korean Won (KRW) and Euro (EUR).
- **Conversion History**: View past conversions for easy reference.
- **User-Friendly Interface**: A simple and clean UI for seamless experience.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: v14.x or later
- **npm** (Node Package Manager) or **yarn**

## Installation

To get started with the project, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/NicolasYapobi/kconvertor-frontend.git
   ```
2. Navigate into the project directory:
   ```bash
   cd kconvertor-frontend/app
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

To run the application locally, use the following command:

```bash
npm run dev
```

Then, open your browser and go to [http://localhost:3000](http://localhost:3000) to access the application.

## Project Structure

Here's a quick overview of the project structure:

```md
📦 kconvertor-frontend
 ┣ 📂 public        # Fichiers statiques
 ┣ 📂 pages         # Pages principales de l'application (Next.js)
 ┣ 📂 components    # Composants réutilisables
 ┣ 📂 styles        # Fichiers CSS et styles globaux
 ┣ 📂 hooks         # Hooks React personnalisés
 ┣ 📂 utils         # Fonctions utilitaires
 ┣ 📂 services      # Gestion des appels API
 ┣ 📜 package.json  # Dépendances et scripts npm
 ┗ 📜 README.md     # Documentation
```

## API

This application connects to an external API to fetch live conversion rates. The API endpoint and methods used include:

- **Conversion Endpoint**: Provides real-time conversion rates.
- **Method**: Uses GET requests to retrieve the latest conversion data.

### Example API Request
```js
fetch("https://api.koreanconvertor.com/currency?amount=1000&from=KRW&to=EUR")
  .then(response => response.json())
  .then(data => console.log(data));
```

For details on the backend API, refer to the backend repository [here](https://github.com/KoreanConvertor/kconvertor-server).

## 🚀 Deployment

Lien vers l'application en production : [koreanconvertor.vercel.app](https://koreanconvertor.vercel.app)

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and make a pull request with your changes. Be sure to follow our coding guidelines and keep changes concise and well-documented.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Useful Links

- **Backend Repository**: [KoreanConvertor Backend](https://github.com/KoreanConvertor/kconvertor-server)
- **GitHub Profile**: [NicolasYapobi](https://github.com/NicolasYapobi)

