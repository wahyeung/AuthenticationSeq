# AuthenticationSeq

This Express.js application utilizes PostgreSQL for database operations and integrates Google Cloud Storage for storing photos. It supports user registration, authentication, and allows logged-in users to create posts.

## Features

- **User Registration**: Users can register by providing a username, email, and password.
- **User Authentication**: Users can log in using their email and password. Upon successful login, a JWT token is provided for session management.
- **Post Creation**: Authenticated users can create posts with a description and a photo. The photos are uploaded to Google Cloud Storage.
- **Pagination in Posts**: Users can retrieve posts with pagination.
- **Add Friends**: Users can add other users as friends.
- **Friends List with Mutual Friends Count**: The friends list endpoint returns friends' info along with the number of mutual friends.
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


**Get Posts with Pagination:**
Endpoint: 'GET/posts'
Headers:
{
  "Authorization": "Bearer your_jwt_token"
}

Quety Parameters:
'page':The page number(default:1)
'limit':The number of posts per page(default:10)


**Add Friend:**
Endpoins: 'POST/friends/add'
Headers:
{
  "Authorization": "Bearer your_jwt_token"
}


Body:
{
  "friendId": "friend_user_id"
}

**Get Friends List with Mutual Friends Count:**
Endpoind:'GET/friends/gets'
Headers:
{
  "Authorization": "Bearer your_jwt_token"
}




### License
This project is licensed under the MIT License.
