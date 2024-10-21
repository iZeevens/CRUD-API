# Node.js API Application

## Prerequisites
- **Node.js**: v22.x.x or above
- **npm**: v6.x or above

## Installation

To get started, clone this repository and install the dependencies:

```bash
git clone https://github.com/yourusername/yourrepository.git
cd yourrepository
npm install
```

## Running the Application

### There are two modes available: development and production.

- **development**: npm run start:dev
- **production**: npm run build, npm run start:prod

### Environment Setup

- **.env**: Create a .env file in the root directory and define the PORT variable

## Usage

### Available Endpoints:

- **GET /api/users**: Retrieve all users (returns an empty array if none exist)
  
- **POST /api/users**: Create a new user  
  - **Body (JSON)**:
    ```json
    {
      "username": "John Doe",
      "age": 30,
      "hobbies": ["reading", "gaming"]
    }
    ```

- **GET /api/users/:id**: Get a user by ID

- **PUT /api/users/:id**: Update a user by ID  
  - **Body (JSON)**: Any combination of fields to update (`username`, `age`, `hobbies`)

- **DELETE /api/users/:id**: Delete a user by ID

## Testing

- **testing**: npm run test

