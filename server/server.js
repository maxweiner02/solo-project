/* eslint-disable no-console */
const express = require('express');
const models = require('./storyNodeModel');

const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/help', (req, res, next) => {
  console.log(req.body);
  const {
    title, text, locationX, locationY,
  } = req.body;
  models.StoryNode.create({
    title, text, locationX, locationY,
  })
    .then((data) => {
      console.log(data);
      res.status(200).send('woohoo');
    })
    .catch((err) => next({
      log: err,
      message: { err: 'oopsies poopsies' },
    }));
});

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const defaultErr = {
    log: err,
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
