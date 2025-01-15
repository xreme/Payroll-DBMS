# Payroll Management System

## Prerequisites

- Python 3.11
- Node.js
- npm (Node Package Manager)

## Backend Setup

1. Navigate to the `backend` directory:

    ```sh
    cd backend
    ```

2. Create a virtual environment:

    ```sh
    python -m venv venv
    ```

3. Activate the virtual environment:

    - On Windows:

        ```sh
        venv\Scripts\activate
        ```

    - On macOS/Linux:

        ```sh
        source venv/bin/activate
        ```

4. Install the required Python packages:

    ```sh
    pip install -r requirements.txt
    ```

5. Run the Flask application:

    ```sh
    python3 app.py
    ```

    The backend server will start on `http://127.0.0.1:5000`.

## Frontend Setup

1. Navigate to the [frontend](directory:

    ```sh
    cd frontend
    ```

2. Install the required Node.js packages:

    ```sh
    npm install
    ```

3. Start the React application:

    ```sh
    npm start
    ```

    The frontend server will start on `http://localhost:3000`.

## Usage

- Open your browser and navigate to `http://localhost:3000` to access the frontend application.
- The frontend application will communicate with the backend server running on `http://127.0.0.1:5000`.

## Project Structure

- [backend]: Contains the backend Flask application.
- [frontend]: Contains the frontend React application.
