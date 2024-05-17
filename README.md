# AuthenticationSeq

This Express.js application utilizes PostgreSQL for database operations and integrates Google Cloud Storage for storing photos. It supports user registration, authentication, and allows logged-in users to create posts.

## Features

- **User Registration**: Users can register by providing a username, email, and password.
- **User Authentication**: Users can log in using their email and password. Upon successful login, a JWT token is provided for session management.
- **Post Creation**: Authenticated users can create posts with a description and a photo. The photos are uploaded to Google Cloud Storage.

## Installation and Setup

### Prerequisites

- Node.js
- PostgreSQL
- Google Cloud account with a configured storage bucket


### Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/wahyeung/AuthenticationSeq.git
   cd authenticationseq

2. **Install the dependencies:**
   npm install

3. **Set up environment variables:**
  Create a .env file in the root directory with the following content:
  JWT_SECRET=your_jwt_secret_key_here
  GCP_KEY_FILE=path_to_your_gcp_key_file.json
  DB_USER=your_postgres_username
  DB_PASSWORD=your_postgres_password
  DB_NAME=your_database_name
  DB_HOST=your_database_host


4. **Database Setup:**
Run the database migrations to set up the required tables:
   npx sequelize-cli db:migrate

   
5. **Start the application:**   
   npm start


### API Endpoints
**User Registration:**
Endpoint:'POST /users/register'
Body:
{
  "username": "your_username",
  "email": "your_email",
  "password": "your_password"
}


**User Login:**
Endpoint: 'POST /users/login'
Body:
{
  "email": "your_email",
  "password": "your_password"
}

**Create Post:**
Endpoint: 'POST /posts/create'
Hearders:
{
  "Authorization": "Bearer your_jwt_token"
}
Request Body (Form-Data):
description: Your post description
photo: The photo file to upload

# Req2 Implementation

## Changes Implemented
- Added `createdAt` attribute to posts
- Implemented time difference calculation for posts
- Enabled posts to have multiple photos (up to 5)
- Added functionality to edit post descriptions


## API Endpoints

**Create Post:**
- Endpoint: `POST /posts/create`
- Headers: 
  ```json
  {
    "Authorization": "Bearer your_jwt_token"
  }

Body(Form-Data):
description: Your post description
photos:The phto files to upload(up to 5)

**Get Post:**
Endpoints:GET/posts/get
Headers:
{
  "Authorization": "Bearer your_jwt_token"
}


**Updated Post Description:**
Endpoints:'PUT/posts/update-description'
Headers:
{
  "Authorization": "Bearer your_jwt_token"
}

Body:
{
  "postId": "id_of_the_post_to_update",
  "description": "new_post_description"
}





### License
This project is licensed under the MIT License.
