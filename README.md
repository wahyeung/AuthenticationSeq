# AuthenticationSeq

This project is an Express.js application that uses PostgreSQL for the database. It allows users to register, login, and create posts with a description and photo, which is stored in Google Cloud Storage.

## Features

- User registration with username, email, and password
- User login with JWT authentication
- Create posts with a description and photo
- Store photos in Google Cloud Storage

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/wahyeung/AuthenticationSeq.git
   cd authenticationseq

2.Install the dependencies:
   npm install

3.Create a .env file and add your environment variables:
  JWT_SECRET=your_secret_key_here
  GCP_KEY_FILE=/path/to/your/gcp/keyfile.json

4. Start the server:
   npm start

User Registration:
Endpoint:'POST /users/register'
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}


User Login:
Endpoint: 'POST /users/login'
Requested Body:
{
  "email": "your_email",
  "password": "your_password"
}

Create Post:
Endpoint: 'POST /posts/create'
Hearders:
{
  "Authorization": "Bearer your_jwt_token"
}
Request Body (Form-Data):
description: Your post description
photo: The photo file to upload


License
This project is licensed under the MIT License.
