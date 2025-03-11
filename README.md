# Invoice Management System

An invoice management application with authentication, invoice creation, and management capabilities.

![Invoice Management System](https://github.com/navbiswas133/Invoice-Management-System)

## 📋 Project Overview

This project is a comprehensive invoice management system built with Vue.js and Node.js. It allows users to create, view, and manage invoices through an intuitive multi-step form process. The application features a robust authentication system and responsive design that works across different devices.

### Key Features

- **User Authentication**: Secure login and registration system
- **Invoice Dashboard**: View all invoices with filtering capabilities
- **Multi-step Invoice Creation**: Guided process with validation
- **Real-time Calculations**: Dynamic pricing calculations within invoice forms
- **Responsive Design**: Works seamlessly on desktop and mobile devices


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

The application is deployed and accessible at: [https://invoice-management-app.example.com](https://invoice-management-system-g4l3.vercel.app/)


## 📸 Screenshots

### Authentication Screen

![asspg1](https://github.com/user-attachments/assets/ba5ca528-685e-45d3-801f-b931d405d18f)

### Invoice Dashboard

![asspg2](https://github.com/user-attachments/assets/750f5d17-d657-4026-b854-6640fc92d3c2)

### Invoice Creation Form

![asspg3](https://github.com/user-attachments/assets/8a35170c-ee20-434c-acfd-e353d7e3547f)

![asspg4](https://github.com/user-attachments/assets/7e7cda59-21e0-453c-806a-c41b7a33af0e)

### Invoice Preview

![asspg5](https://github.com/user-attachments/assets/84778bea-45cf-4685-96f3-ee7e05036875)


## 📥 Installation & Setup

### Prerequisites


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


## 👨‍💻 Author

Navkumar Biswas - [navbiswas133](https://github.com/yourusername)

```

### Lints and fixes files
```

npm run lint

```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
```
