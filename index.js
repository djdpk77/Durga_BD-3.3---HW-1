const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3000;

let watchList = [
  {
    videoId: 1,
    title: 'JavaScript Tutorial',
    watched: false,
    url: 'https://youtu.be/shorturl1',
    isFavorite: false,
  },
  {
    videoId: 2,
    title: 'Node.js Basics',
    watched: true,
    url: 'https://youtu.be/shorturl2',
    isFavorite: false,
  },
  {
    videoId: 3,
    title: 'React.js Guide',
    watched: false,
    url: 'https://youtu.be/shorturl3',
    isFavorite: false,
  },
];

let tasks = [
  { taskId: 1, title: 'Buy groceries', completed: false },
  { taskId: 2, title: 'Walk the dog', completed: false },
  { taskId: 3, title: 'Do laundry', completed: true },
];

let books = [
  { bookId: 1, title: '1984', available: true },
  { bookId: 2, title: 'Brave New World', available: true },
  { bookId: 3, title: 'Fahrenheit 451', available: false },
];

app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

//Function to filter and return all unwatched videos
function deleteUnwatchedVideos(watchList) {
  return watchList.filter((video) => video.watched);
}

//Endpoint 1: Remove All Unwatched Videos
app.get('/watchlist/delete-unwatched', (req, res) => {
  let result = deleteUnwatchedVideos(watchList);
  res.json(result);
});

//Function to update the favorite status of a video by ID
function markVideoAsFavorite(watchList, videoId, isFavorite) {
  for (let i = 0; i < watchList.length; i++) {
    if (watchList[i].videoId === videoId) {
      watchList[i].isFavorite = isFavorite;
      break;
    }
  }
  return watchList;
}

//Endpoint 2: Mark Video as Favorite by ID
app.get('/watchlist/favorite', (req, res) => {
  let videoId = parseInt(req.query.videoId);
  let isFavorite = req.query.isFavorite === 'true';
  let result = markVideoAsFavorite(watchList, videoId, isFavorite);

  res.json(result);
});

//Function to update the status of a task by ID
function updateTaskStatusById(tasks, taskId, completed) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].taskId === taskId) {
      tasks[i].completed = completed;
      break;
    }
  }
  return tasks;
}

//Endpoint 3: Update Task Status by ID
app.get('/tasks/update', (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let completed = req.query.completed === 'true';
  let result = updateTaskStatusById(tasks, taskId, completed);

  res.json(result);
});

//Function to filter out completed tasks
function removeCompletedTasks(tasks) {
  return tasks.filter((task) => !task.completed);
}

//Endpoint 4: Remove Completed Tasks
app.get('/tasks/remove-completed', (req, res) => {
  let result = removeCompletedTasks(tasks);

  res.json(result);
});

//Function to update the availability of a book by ID
function updateBookAvailabilityById(books, bookId, available) {
  for (let i = 0; i < books.length; i++) {
    if (books[i].bookId === bookId) {
      books[i].available = available;
      break;
    }
  }
  return books;
}

//Endpoint 5: Update Library Book Availability by ID
app.get('/library/update/', (req, res) => {
  let bookId = parseInt(req.query.bookId);
  let available = req.query.available === 'true';
  let result = updateBookAvailabilityById(books, bookId, available);
  res.json(result);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
