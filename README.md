# MatchMateApi

Welcome to the MatchMateApi project! This API provides the backend services for the MatchMate app, connecting users with local sports activities. Follow these instructions to set up and run the API.

## Installation

Follow these steps to set up the project:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/malekhizaoui/MatchMateApi.git
    cd matchmateapi
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Start the Server:**
    ```bash
    npm start
        or 
    npm run dev
    ```

5. **Verify the Server is Running:**
    - Open your browser or use a tool like Postman to test the API endpoints. The server should be running at the configured base URL : http://localhost:3009/api/v1/{endpoint}.


## Routes and Testing

Below are the available routes and sample requests to test each endpoint. You can use tools like Postman or curl to interact with these endpoints.

### Auth Routes
- **Register**
- **Login**
- **Resend Verification Code**
- **Reset Password**
### User Routes
- **Get All Users**
- **Get User by ID**
- **Update User**
- **Delete User**
- **Delete Time Slot from User**
- **Get Stadiums Excluding Feedback for User**
### Field Routes
- **Get All Fields**
- **Get Field by ID**
- **Get Fields by Region**
- **Create Field**
- **Update Field**
- **Delete Field**
### Stadium Routes
- **Get All Stadiums**
- **Get Stadium by ID**
- **Create Stadium**
- **Update Stadium**
- **Delete Stadium**
### Time Slot Routes
- **Get All Time Slots**
- **Get Time Slot by ID**
- **Create Time Slot**
- **Update Time Slot**
- **Delete Time Slot**
### Game History Routes
- **Get All Game Histories**
- **Get Game History by ID**
- **Get Game Histories by User ID**


## Troubleshooting

- **Common Issues:**
    - Ensure all dependencies are correctly installed.
    - Verify that the correct port is being used and that no other application is using it.
    - Check the console for any error messages and consult the documentation for any additional configuration steps.

## Contributors

- Your Name

Feel free to contribute to the project or report any issues. Your feedback and contributions are welcome!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
