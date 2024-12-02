
# Mini Search Engine API

A simple search engine API built using **Node.js** and **Express** to manage articles with persistence and keyword-based search. This project demonstrates how to add, retrieve, and search articles, while also implementing an inverted index for fast text-based searches.

## Features

- **Add Articles**: Allows the addition of new articles with a title, content, and optional tags.
- **Search Articles**: Allows keyword-based search using an inverted index and ranks results by relevance (keyword frequency).
- **Get Articles by ID**: Fetch an individual article by its unique ID.
- **Persistence**: Articles and the inverted index are persisted in a JSON file (`articles.json`), so data is retained across server restarts.

## Requirements

- **Node.js** (>=12.x)
- **Express.js** (for server)
- **fs** (for file handling)
- **path** (for path management)

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/mini-search-engine-api.git
   cd mini-search-engine-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   node server.js
   ```

   The server will be running at `http://localhost:3000`.

## Endpoints

### 1. **POST /articles**
   - **Description**: Add a new article.
   - **Body** (JSON):
     ```json
     {
       "title": "Article Title",
       "content": "Article content here",
       "tags": ["tag1", "tag2"]
     }
     ```
   - **Response**:
     ```json
     {
       "message": "Article added.",
       "article": { "id": 1, "title": "Article Title", "content": "Article content here", "tags": ["tag1", "tag2"] }
     }
     ```

### 2. **GET /articles/search?query=keyword**
   - **Description**: Search for articles by keyword and rank results by relevance (keyword frequency).
   - **Query Parameters**: 
     - `query` (required): The keyword to search for.
   - **Response**:
     ```json
     {
       "results": [
         { "id": 1, "title": "Article Title", "content": "Article content here", "tags": ["tag1", "tag2"] }
       ]
     }
     ```

### 3. **GET /articles/:id**
   - **Description**: Retrieve a single article by ID.
   - **URL Parameters**:
     - `id`: The ID of the article to fetch.
   - **Response**:
     ```json
     {
       "article": { "id": 1, "title": "Article Title", "content": "Article content here", "tags": ["tag1", "tag2"] }
     }
     ```

### 4. **GET /** 
   - **Description**: Displays the list of available API endpoints.

## Data Persistence

Articles and their respective inverted index are stored in the `articles.json` file. The server automatically loads the data from this file on startup and saves any new articles or updates to the file.

---

## Example Usage (Postman)

### Add Articles:
1. Open Postman.
2. Set the method to **POST**.
3. URL: `http://localhost:3000/articles`
4. In the **Body** tab, select **raw** and set the format to **JSON**.
5. Paste the article JSON and send the request.

Example JSON for a new article:
```json
{
  "title": "The Wonders of Space Exploration",
  "content": "Space exploration has led to countless discoveries, from understanding the origins of the universe to identifying planets beyond our solar system.",
  "tags": ["space", "science", "exploration"]
}
```

### Search Articles:
1. Set the method to **GET**.
2. URL: `http://localhost:3000/articles/search?query=space`
3. Send the request to search for articles containing the keyword "space".

### Get Article by ID:
1. Set the method to **GET**.
2. URL: `http://localhost:3000/articles/1`
3. Send the request to retrieve the article with ID 1.

---


## Author

Meiha


