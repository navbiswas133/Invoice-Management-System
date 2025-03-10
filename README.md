# Invoice Management System

An invoice management application with authentication, invoice creation, and management capabilities.

![Invoice Management System](https://via.placeholder.com/800x400?text=Invoice+Management+System)

## 📋 Project Overview

This project is a comprehensive invoice management system built with Vue.js and Node.js. It allows users to create, view, and manage invoices through an intuitive multi-step form process. The application features a robust authentication system and responsive design that works across different devices.

### Key Features

- **User Authentication**: Secure login and registration system
- **Invoice Dashboard**: View all invoices with filtering capabilities
- **Multi-step Invoice Creation**: Guided process with validation
- **Real-time Calculations**: Dynamic pricing calculations within invoice forms
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### Website Screenshorts

## 🛠️ Technologies Used

### Frontend

- Vue.js 3
- Vuex for state management
- Vue Router for navigation
- Vuetify 3 for UI components
- Axios for API requests

### Backend

- Node.js
- Express.js framework
- MongoDB for database
- Mongoose ODM
- JWT for authentication

## 🚀 Live Demo

The application is deployed and accessible at: [https://invoice-management-app.example.com](https://invoice-management-app.example.com)

## 📸 Screenshots


![asspg1](https://github.com/user-attachments/assets/9be64e5d-f741-4d8f-8dc4-706c31003600)

![asspg2](https://github.com/user-attachments/assets/feb4d640-3655-4ccf-90aa-19afb3273b87)

![asspg3](https://github.com/user-attachments/assets/9d2659e5-2e1d-4872-b0f2-24fa7c1e7a4a)

![asspg4](https://github.com/user-attachments/assets/f2cee467-6c0b-4792-92af-32f1376f3a33)

![asspg5](https://github.com/user-attachments/assets/7214a17e-cf15-4a19-9d1e-7edecf44080e)

### Authentication Screen

![Authentication Screen](https://via.placeholder.com/400x300?text=Authentication+Screen)

### Invoice Dashboard

![Invoice Dashboard](https://via.placeholder.com/400x300?text=Invoice+Dashboard)

### Invoice Creation Form

![Invoice Creation](https://via.placeholder.com/400x300?text=Invoice+Creation)

### Invoice Preview

![Invoice Preview](https://via.placeholder.com/400x300?text=Invoice+Preview)

## 📥 Installation & Setup

### Prerequisites

- Node.js (v14 or above)
- npm or yarn
- MongoDB

### Backend Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/invoice-management-system.git
   cd invoice-management-system
   ```

2. Navigate to the server directory:

   ```bash
   cd server
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the server directory with the following variables:

   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/invoice_app
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

5. Start the server:
   ```bash
   npm run dev
   ```
   The server will run on - Local: http://localhost:8080/

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd my-vue-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the cd my-vue-app directory:

   ```
   VUE_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development server:
   ```bash
   npm run serve
   ```
   The application will run on http://localhost:8080

## 🗂️ Project Structure

```
invoice-management-system/
├── cd my-vue-app/                  # Frontend Vue.js application
│   ├── public/              # Static assets
│   ├── src/                 # Source files
│      ├── assets/          # Images, fonts, etc.
│      ├── components/      # Vue components
│      ├── router/          # Vue Router configuration
│      ├── store/           # Vuex store modules
│      ├── views/           # Page components
│      ├── App.vue          # Root component
│      └── main.js          # Entry point
│
│
├── server/                  # Backend Node.js application
│   ├── config/              # Configuration files
│   ├── controllers/         # Request handlers
│   ├── middleware/          # Express middleware
│   ├── models/              # Mongoose models
│   ├── routes/              # API routes
│   ├── utils/               # Utility functions
│   ├── .env                 # Environment variables
│   └── server.js            # Entry point
│
└── README.md                # Project documentation
```

## 📝 API Documentation

### Authentication Endpoints

- **POST /api/auth/register**: Register a new user

  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

- **POST /api/auth/login**: Login and receive JWT token
  ```json
  {
    "email": "user@example.com",
    "password": "securepassword"
  }
  ```

### Invoice Endpoints

- **GET /api/invoices**: Get all invoices for logged-in user
- **GET /api/invoices/:id**: Get specific invoice by ID
- **POST /api/invoices**: Create new invoice
- **PUT /api/invoices/:id**: Update existing invoice
- **DELETE /api/invoices/:id**: Delete an invoice

## 🔑 Authentication Flow

1. User registers or logs in via the authentication form
2. Upon successful authentication, the server sends a JWT token
3. The token is stored in localStorage and included in the Authorization header for subsequent API requests
4. Protected routes check for valid token before granting access

## 🧪 Testing

### Backend Tests

```bash
cd server
npm run test
```

### Frontend Tests

```bash
cd client
npm run test
```

## 📈 Future Enhancements

- Email notifications for invoice creation and updates
- PDF generation and download
- Payment integration
- User roles and permissions

## 💡 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

```

### Lints and fixes files
```

npm run lint

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
```
