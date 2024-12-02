const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// File path for persistence
const ARTICLES_FILE_PATH = path.join(__dirname, 'articles.json');

// Data store for articles and inverted index
let articles = [];
let index = {}; // Inverted index with keyword frequency tracking

// Load articles from file if it exists
if (fs.existsSync(ARTICLES_FILE_PATH)) {
  const data = fs.readFileSync(ARTICLES_FILE_PATH, 'utf8');
  const { storedArticles, storedIndex } = JSON.parse(data);
  articles = storedArticles || [];
  index = storedIndex || {};
}

// Save articles and index to file
function saveArticlesToFile() {
  const data = JSON.stringify({ storedArticles: articles, storedIndex: index });
  fs.writeFileSync(ARTICLES_FILE_PATH, data, 'utf8');
}

// Add an article and update the index with keyword frequency
app.post('/articles', (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).send({ message: 'Title and content are required.' });
  }

  const id = articles.length + 1;
  const newArticle = { id, title, content, tags };
  articles.push(newArticle);

  // Tokenize and update the index with keyword frequency
  const words = (title + ' ' + content).toLowerCase().split(/\W+/);
  words.forEach((word) => {
    if (!index[word]) {
      index[word] = {};
    }
    index[word][id] = (index[word][id] || 0) + 1; // Increment frequency
  });

  // Save the articles and index to the file
  saveArticlesToFile();

  res.send({ message: 'Article added.', article: newArticle });
});

// Search articles using the inverted index and rank by keyword frequency
app.get('/articles/search', (req, res) => {
  const { query } = req.query;
  if (!query) {
    return res.status(400).send({ message: 'Query is required.' });
  }

  const keyword = query.toLowerCase();
  const matches = index[keyword];

  if (!matches) {
    return res.send({ results: [] }); // No matches found
  }

  // Sort articles by keyword frequency (relevance)
  const sortedResults = Object.entries(matches)
    .sort(([, freqA], [, freqB]) => freqB - freqA) // Descending frequency
    .map(([id]) => articles.find((article) => article.id === parseInt(id)));

  res.send({ results: sortedResults });
});

// Retrieve an article by ID
app.get('/articles/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return res.status(404).send({ message: 'Article not found.' });
  }

  res.send({ article });
});

// Root endpoint for API info
app.get('/', (req, res) => {
  res.send(
    '<h1>Welcome to the Mini Search Engine API</h1>' +
    '<p>Use the following endpoints:</p>' +
    '<ul>' +
    '<li><b>POST /articles</b>: Add a new article</li>' +
    '<li><b>GET /articles/search</b>: Search for articles</li>' +
    '<li><b>GET /articles/:id</b>: Get an article by ID</li>' +
    '</ul>'
  );
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
