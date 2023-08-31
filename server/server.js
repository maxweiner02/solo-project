/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');
const cors = require('cors');
const path = require('path');
const models = require('./storyNodeModel');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  // statically serve everything in the build folder on the route '/build'
  app.use('/dist', express.static(path.join(__dirname, '../dist')));
  // serve index.html on the route '/'
  app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));
}

app.post('/save', async (req, res, next) => {
  const {
    title, text, locationX, locationY,
  } = req.body;
  console.log();
  const count = await models.StoryNode.find({ title }).count().exec();

  if (count === 0) {
    models.StoryNode.create({
      title, text, locationX, locationY,
    })
      .then((data) => {
        console.log(data);
        res.status(200).json('note saved successfully');
      })
      .catch((err) => next({
        log: err,
        message: { err: 'oopsies poopsies' },
      }));
  } else {
    models.StoryNode.updateOne({ title }, {
      locationX, locationY, title, text,
    })
      .then(() => {
        res.status(200).json('location updated successfully');
      })
      .catch((err) => next({
        log: err,
        message: { err: 'oopsies poopsies' },
      }));
  }
});

app.get('/load', (req, res, next) => {
  models.StoryNode.find({})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => next({
      log: err,
      message: { err: 'oopsies poopsies' },
    }));
});

app.delete('/delete', (req, res, next) => {
  const { title } = req.body;
  models.StoryNode.findOneAndDelete({ title })
    .then(() => {
      res.status(200).json('note deleted successfully');
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
