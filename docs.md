# USOF API Documentation

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Authentication](#authentication)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)
    - [Authentication](#authentication-endpoints)
    - [Users](#users-endpoints)
    - [Posts](#posts-endpoints)
    - [Categories](#categories-endpoints)
    - [Comments](#comments-endpoints)
- [Error Handling](#error-handling)
- [Data Models](#data-models)

## Overview

USOF (User Stack Overflow-like Forum) is a RESTful API for a question-and-answer platform where users can create posts, comment on them, and interact through likes/dislikes. The system supports role-based access control with user and admin roles.

### Key Features
- User registration and authentication
- Post creation and management
- Comment system
- Like/dislike functionality
- Category organization
- Role-based permissions (User/Admin)
- Post and comment moderation
- User rating system
- Image upload support
- Favorites and subscriptions

## Architecture

The API follows the MVC (Model-View-Controller) pattern:

- **Models**: Custom Active Record implementation extending base Model class with query builder
- **Views**: JSON responses
- **Controllers**: Handle HTTP requests and business logic
- **Services**: Business logic layer
- **Middlewares**: Authentication, validation, error handling
- **Routers**: Route definitions and endpoint mapping

## Authentication

The API uses token-based authentication. Users must register and confirm their email before accessing protected endpoints.

### Authentication Flow
1. Register with email confirmation
2. Login to receive authentication token
3. Include token in Authorization header for protected endpoints
4. Logout to invalidate token

## Database Schema

### Users Table
- `id` (Primary Key)
- `login` (Unique, max 32 chars)
- `firstname` (UTF-8, max 32 chars)
- `lastname` (UTF-8, max 32 chars)
- `password` (Hashed, max 320 chars)
- `email` (Unique, max 320 chars)
- `profile_picture` (Optional, max 255 chars)
- `rating` (Auto-calculated from likes/dislikes)
- `role` (USER/ADMIN, default: USER)

### Posts Table
- `id` (Primary Key)
- `author_id` (Foreign Key to users)
- `title` (max 255 chars)
- `status` (ACTIVE/INACTIVE, default: ACTIVE)
- `content` (TEXT, UTF-8 support)
- `created_at` (Auto-generated)
- `updated_at` (Auto-updated)

### Categories Table
- `id` (Primary Key)
- `title` (Unique, max 255 chars)
- `description` (TEXT)

### Comments Table
- `id` (Primary Key)
- `author_id` (Foreign Key to users)
- `post_id` (Foreign Key to posts)
- `content` (TEXT, UTF-8 support)
- `created_at` (Auto-generated)
- `updated_at` (Auto-updated)

### Additional Tables
- `posts_categories` - Many-to-many relationship between posts and categories
- `post_images` - Store multiple images per post
- `users_favourites` - User favorite posts
- `users_subscriptions` - User post subscriptions
- `likes` - Post likes/dislikes
- `comment_likes` - Comment likes/dislikes

## API Endpoints

### Authentication Endpoints

#### Register User
```
POST /api/auth/register
```
**Description**: Register a new user account

**Request Body**:
```json
{
  "login": "string",
  "firstname": "string",
  "lastname": "string",
  "email": "string",
  "password": "string",
  "password_confirmation": "string"
}
```

**Response**:
- `201`: User created successfully
- `400`: Validation error
- `409`: User already exists

#### Login
```
POST /api/auth/login
```
**Description**: Authenticate user and receive access token

**Request Body**:
```json
{
  "login": "string",
  "email": "string", 
  "password": "string"
}
```

**Response**:
- `200`: Login successful with token
- `401`: Invalid credentials
- `403`: Email not confirmed

#### Logout
```
POST /api/auth/logout
```
**Description**: Invalidate current session token

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `200`: Logout successful

#### Password Reset Request
```
POST /api/auth/password-reset
```
**Description**: Send password reset link to user email

**Request Body**:
```json
{
  "email": "string"
}
```

**Response**:
- `200`: Reset link sent

#### Confirm Password Reset
```
POST /api/auth/password-reset/:confirm_token
```
**Description**: Set new password using reset token

**Request Body**:
```json
{
  "password": "string"
}
```

**Response**:
- `200`: Password updated successfully
- `400`: Invalid or expired token

#### Refresh Token
```
POST /api/auth/refresh
```
**Description**: Refresh access token using refresh token

**Headers**: `Authorization: Bearer <refresh_token>`

**Response**:
- `200`: New access token issued
- `401`: Invalid refresh token

### Users Endpoints

#### Get All Users
```
GET /api/users
```
**Description**: Retrieve all users

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `page` (optional): Page number for pagination
- `limit` (optional): Items per page
- `order_by` (optional): Sort field ('login', 'rating', 'id', etc.)
- `order_dir` (optional): Sort direction ('ASC', 'DESC')

**Response**:
- `200`: List of users with pagination
- `401`: Authentication required

#### Get User by ID
```
GET /api/users/:user_id
```
**Description**: Get specific user data

**Response**:
- `200`: User data
- `404`: User not found

#### Create User
```
POST /api/users
```
**Description**: Create new user (Admin only)

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "login": "string",
  "firstname": "string",
  "lastname": "string",
  "password": "string",
  "password_confirmation": "string",
  "email": "string",
  "role": "USER|ADMIN"
}
```

**Response**:
- `201`: User created
- `403`: Admin access required

#### Upload Avatar
```
PATCH /api/users/avatar
```
**Description**: Upload user profile picture

**Headers**: `Authorization: Bearer <token>`

**Request**: Multipart form data with image file

**Response**:
- `200`: Avatar updated
- `400`: Invalid file format

#### Update User Data
```
PATCH /api/users/:user_id
```
**Description**: Update user information

**Headers**: `Authorization: Bearer <token>`

**Request Body** (partial):
```json
{
  "firstname": "string",
  "lastname": "string",
  "email": "string"
}
```

**Response**:
- `200`: User updated
- `403`: Access denied
- `404`: User not found

#### Delete User
```
DELETE /api/users/:user_id
```
**Description**: Delete user account

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `200`: User deleted
- `403`: Access denied
- `404`: User not found

### Posts Endpoints

#### Get All Posts
```
GET /api/posts
```
**Description**: Retrieve all active posts (public endpoint)

**Query Parameters**:
- `page` (optional): Page number
- `limit` (optional): Items per page
- `order_by` (optional): Sort field ('id', 'likes', 'created_at', etc.)
- `order_dir` (optional): Sort direction ('ASC', 'DESC')
- `categories` (optional): Filter by category names (comma-separated)
- `date_from` (optional): Filter from date (YYYY-MM-DD)
- `date_to` (optional): Filter to date (YYYY-MM-DD)
- `status` (optional): Filter by status ('ACTIVE'/'INACTIVE') - Admin only

**Response**:
- `200`: List of posts with pagination metadata

#### Get Post by ID
```
GET /api/posts/:post_id
```
**Description**: Get specific post data (public)

**Response**:
- `200`: Post data
- `404`: Post not found

#### Create Post
```
POST /api/posts
```
**Description**: Create new post

**Headers**: `Authorization: Bearer <token>`

**Request**: Multipart form data
- `title` (string, required): Post title
- `content` (string, required): Post content
- `categories` (array of strings, required): Category names
- `images` (files, optional): Multiple image files

**Response**:
- `201`: Post created
- `400`: Validation error

#### Update Post
```
PATCH /api/posts/:post_id
```
**Description**: Update post (author can edit content, admin can change status)

**Headers**: `Authorization: Bearer <token>`

**Request**: Multipart form data
- `title` (string, optional): New post title
- `content` (string, optional): New post content
- `categories` (array of strings, optional): New category names
- `images` (files, optional): New image files to add
- `files_to_delete` (array of integers, optional): Image IDs to delete
- `status` (string, optional): Post status ('ACTIVE'/'INACTIVE') - Admin only

**Response**:
- `200`: Post updated
- `403`: Access denied
- `404`: Post not found

#### Delete Post
```
DELETE /api/posts/:post_id
```
**Description**: Delete post

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `200`: Post deleted
- `403`: Access denied
- `404`: Post not found

#### Get Post Comments
```
GET /api/posts/:post_id/comments
```
**Description**: Get all comments for a post (public)

**Response**:
- `200`: List of comments
- `404`: Post not found

#### Create Comment on Post
```
POST /api/posts/:post_id/comments
```
**Description**: Add comment to post

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "content": "string"
}
```

**Response**:
- `201`: Comment created
- `404`: Post not found

#### Get Post Categories
```
GET /api/posts/:post_id/categories
```
**Description**: Get categories associated with post (public)

**Response**:
- `200`: List of categories
- `404`: Post not found

#### Get Post Likes
```
GET /api/posts/:post_id/like
```
**Description**: Get all likes for post (public)

**Response**:
- `200`: List of likes with count
- `404`: Post not found

#### Like/Dislike Post
```
POST /api/posts/:post_id/like
```
**Description**: Add or update like/dislike on post

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `type` (required): Reaction type ('LIKE' or 'DISLIKE')

**Response**:
- `201`: Like added/updated
- `404`: Post not found

#### Remove Post Like
```
DELETE /api/posts/:post_id/like
```
**Description**: Remove like/dislike from post

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `200`: Like removed
- `404`: Post or like not found

#### Add to Favourites
```
POST /api/posts/favourite/:post_id
```
**Description**: Add post to user's favourites

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `201`: Post added to favourites
- `404`: Post not found

#### Remove from Favourites
```
DELETE /api/posts/favourite/:post_id
```
**Description**: Remove post from user's favourites

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `200`: Post removed from favourites
- `404`: Post or favourite not found

#### Get User Subscriptions
```
GET /api/posts/subscriptions
```
**Description**: Get current user's post subscriptions

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `200`: List of subscribed posts
- `401`: Authentication required

### Categories Endpoints

#### Get All Categories
```
GET /api/categories
```
**Description**: Retrieve all categories (public)

**Query Parameters**:
- `page` (optional): Page number
- `limit` (optional): Items per page
- `order_by` (optional): Sort field ('title', 'id', etc.)
- `order_dir` (optional): Sort direction ('ASC', 'DESC')

**Response**:
- `200`: List of categories with pagination

#### Get Category by ID
```
GET /api/categories/:category_id
```
**Description**: Get specific category data (public)

**Response**:
- `200`: Category data
- `404`: Category not found

#### Get Category Posts
```
GET /api/categories/:category_id/posts
```
**Description**: Get all posts in category (public)

**Query Parameters**:
- `page` (optional): Page number
- `limit` (optional): Items per page
- `order_by` (optional): Sort field ('id', 'created_at', etc.)
- `order_dir` (optional): Sort direction ('ASC', 'DESC')

**Response**:
- `200`: List of posts in category with pagination
- `404`: Category not found

#### Create Category
```
POST /api/categories
```
**Description**: Create new category (Admin only)

**Headers**: `Authorization: Bearer <token>`

**Request Body**:
```json
{
  "title": "string",
  "description": "string"
}
```

**Response**:
- `201`: Category created
- `403`: Admin access required

#### Update Category
```
PATCH /api/categories/:category_id
```
**Description**: Update category data (Admin only)

**Headers**: `Authorization: Bearer <token>`

**Request Body** (partial):
```json
{
  "title": "string",
  "description": "string"
}
```

**Response**:
- `200`: Category updated
- `403`: Admin access required
- `404`: Category not found

#### Delete Category
```
DELETE /api/categories/:category_id
```
**Description**: Delete category (Admin only)

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `200`: Category deleted
- `403`: Admin access required
- `404`: Category not found

### Comments Endpoints

#### Get Comment by ID
```
GET /api/comments/:comment_id
```
**Description**: Get specific comment data (public)

**Response**:
- `200`: Comment data
- `404`: Comment not found

#### Update Comment
```
PATCH /api/comments/:comment_id
```
**Description**: Update comment (author can edit content, admin can change status)

**Headers**: `Authorization: Bearer <token>`

**Request Body** (partial):
```json
{
  "content": "string",
  "status": "ACTIVE|INACTIVE"
}
```

**Response**:
- `200`: Comment updated
- `403`: Access denied
- `404`: Comment not found

#### Delete Comment
```
DELETE /api/comments/:comment_id
```
**Description**: Delete comment

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `200`: Comment deleted
- `403`: Access denied
- `404`: Comment not found

#### Get Comment Likes
```
GET /api/comments/:comment_id/like
```
**Description**: Get all likes for comment (public)

**Response**:
- `200`: List of likes with count
- `404`: Comment not found

#### Like/Dislike Comment
```
POST /api/comments/:comment_id/like
```
**Description**: Add or update like/dislike on comment

**Headers**: `Authorization: Bearer <token>`

**Query Parameters**:
- `type` (required): Reaction type ('LIKE' or 'DISLIKE')

**Response**:
- `201`: Like added/updated
- `404`: Comment not found

#### Remove Comment Like
```
DELETE /api/comments/:comment_id/like
```
**Description**: Remove like/dislike from comment

**Headers**: `Authorization: Bearer <token>`

**Response**:
- `200`: Like removed
- `404`: Comment or like not found

## Error Handling

### Standard HTTP Status Codes

- `200` - OK: Request successful
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid request data or validation error
- `401` - Unauthorized: Authentication required or invalid credentials
- `403` - Forbidden: Access denied (insufficient permissions)
- `404` - Not Found: Resource not found
- `409` - Conflict: Resource already exists
- `422` - Unprocessable Entity: Validation error
- `500` - Internal Server Error: Server error

### Error Response Format

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human readable error message",
    "details": {
      "field": ["Specific validation error"]
    }
  }
}
```

### Common Error Codes

- `VALIDATION_ERROR` - Request validation failed
- `AUTHENTICATION_REQUIRED` - Valid authentication token required
- `ACCESS_DENIED` - Insufficient permissions
- `RESOURCE_NOT_FOUND` - Requested resource not found
- `RESOURCE_CONFLICT` - Resource already exists
- `EMAIL_NOT_CONFIRMED` - Email confirmation required

## Data Models

### User Model
```json
{
  "id": "integer (unsigned, auto_increment, primary key)",
  "login": "string (max 32 chars, unique, not null)",
  "firstname": "string (max 32 chars, utf8mb4_unicode_ci, not null)",
  "lastname": "string (max 32 chars, utf8mb4_unicode_ci, not null)",
  "password": "string (max 320 chars, not null)",
  "email": "string (max 320 chars, unique, not null)",
  "profile_picture": "string|null (max 255 chars)",
  "rating": "integer (not null, default 0)",
  "role": "enum ('USER'|'ADMIN', not null, default 'USER')"
}
```

### Post Model
```json
{
  "id": "integer (unsigned, auto_increment, primary key)",
  "author_id": "integer (unsigned, not null, foreign key to users.id)",
  "title": "string (max 255 chars, not null)",
  "status": "enum ('ACTIVE'|'INACTIVE', not null, default 'ACTIVE')",
  "content": "text (not null, utf8mb4_unicode_ci)",
  "created_at": "timestamp (default CURRENT_TIMESTAMP)",
  "updated_at": "timestamp (default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)"
}
```

### Category Model
```json
{
  "id": "integer (unsigned, auto_increment, primary key)",
  "title": "string (max 255 chars, unique, not null)",
  "description": "text (not null)"
}
```

### Comment Model
```json
{
  "id": "integer (unsigned, auto_increment, primary key)",
  "author_id": "integer (unsigned, not null, foreign key to users.id)",
  "content": "text (not null, utf8mb4_unicode_ci)",
  "post_id": "integer (unsigned, not null, foreign key to posts.id)",
  "created_at": "timestamp (default CURRENT_TIMESTAMP)",
  "updated_at": "timestamp (default CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)"
}
```

### Post Like Model (likes table)
```json
{
  "id": "integer (unsigned, auto_increment, primary key)",
  "user_id": "integer (unsigned, not null, foreign key to users.id)",
  "post_id": "integer (unsigned, not null, foreign key to posts.id)",
  "reaction": "enum ('LIKE'|'DISLIKE', not null)",
  "unique_constraint": "user_id + post_id (one reaction per user per post)"
}
```

### Comment Like Model (comment_likes table)
```json
{
  "id": "integer (unsigned, auto_increment, primary key)",
  "user_id": "integer (unsigned, not null, foreign key to users.id)",
  "comment_id": "integer (unsigned, not null, foreign key to comments.id)",
  "reaction": "enum ('LIKE'|'DISLIKE', not null)",
  "unique_constraint": "user_id + comment_id (one reaction per user per comment)"
}
```

### Post Categories Junction Model (posts_categories table)
```json
{
  "id": "integer (unsigned, auto_increment)",
  "post_id": "integer (unsigned, not null, foreign key to posts.id)",
  "category_id": "integer (unsigned, not null, foreign key to categories.id)",
  "composite_primary_key": "id + post_id + category_id"
}
```

### Post Images Model (post_images table)
```json
{
  "id": "integer (unsigned, auto_increment, primary key)",
  "post_id": "integer (unsigned, not null, foreign key to posts.id)",
  "file_path": "string (max 500 chars, not null)"
}
```

### User Favourites Model (users_favourites table)
```json
{
  "id": "integer (unsigned, auto_increment)",
  "user_id": "integer (unsigned, not null, foreign key to users.id)",
  "post_id": "integer (unsigned, not null, foreign key to posts.id)",
  "composite_primary_key": "id + user_id + post_id"
}
```

### User Subscriptions Model (users_subscriptions table)
```json
{
  "id": "integer (unsigned, auto_increment)",
  "user_id": "integer (unsigned, not null, foreign key to users.id)",
  "post_id": "integer (unsigned, not null, foreign key to posts.id)",
  "composite_primary_key": "id + user_id + post_id"
}
```

## Additional Features

### User Rating System
User rating is automatically calculated based on:
- +1 for each like on user's posts/comments
- -1 for each dislike on user's posts/comments

### Post Sorting Options
- **By likes** (default): Most liked posts first
- **By date**: Newest posts first

### Post Filtering Options
- **By categories**: Show posts from specific categories
- **By date range**: Show posts within date interval
- **By status**: Show active/inactive posts (admin only)

### Image Upload
- Posts support multiple image attachments
- Users can upload profile pictures
- Supported formats: JPG, PNG, GIF
- File size limits apply

### Favorites & Subscriptions
- Users can favorite posts for quick access
- Users can subscribe to posts for notifications
- Additional tables: `users_favourites`, `users_subscriptions`

## Security Considerations

- Passwords are properly hashed and salted
- Email confirmation required for account activation
- Token-based authentication with expiration
- Role-based access control
- Input validation and sanitization
- SQL injection prevention through query builder
- XSS protection for user content