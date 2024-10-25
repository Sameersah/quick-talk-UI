# Chat Application

This is a simple chat application built with React and STOMP over WebSocket.

## Prerequisites

- Node.js (>= 14.x)
- npm (>= 6.x)

## Backend Setup

1. Ensure you have a backend server running that supports STOMP over WebSocket. You can use Spring Boot with WebSocket support or any other compatible server.

## Frontend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/chat-application.git
    cd chat-application
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Update the WebSocket endpoint in the `ChatComponent.js` file if necessary:

    ```javascript
    const socket = new SockJS("http://localhost:8085/chat");
    ```

4. Start the application:

    ```sh
    npm start
    ```

5. Open your browser and navigate to `http://localhost:3000`.

## Usage

- Enter your message in the input box and click "Send" to send a message.
- Messages will be displayed in the chat box.

## Troubleshooting

- Ensure the backend server is running and accessible at the specified WebSocket endpoint.
- Check the browser console for any error messages.

## License

This project is licensed under the MIT License.