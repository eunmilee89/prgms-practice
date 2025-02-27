const express = require('express');
const router = express.Router();
const conn = require('../mariadb');
const { body, param, validationResult } = require('express-validator');

router.use(express.json());

const validate = (req, res, next) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json(err.array());
  } else {
    return next();
  }
};

router
  .route('/')
  .post(
    [
      body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'),
      body('name').notEmpty().isString().withMessage('문자 입력 필요'),
      validate,
    ],
    (req, res, next) => {
      const { name, userId } = req.body;

      const sql = 'INSERT INTO authors (name, user_id) VALUES(?, ?)';
      const values = [name, userId];
      conn.query(sql, values, (err, results) => {
        if (err) {
          return res.status(400).end();
        }
        res.status(201).json(results);
      });
    }
  )
  .get(
    [body('userId').notEmpty().isInt().withMessage('숫자 입력 필요'), validate],
    (req, res, next) => {
      const { userId } = req.body;
      const sql = 'SELECT * FROM authors WHERE user_id = ?';

      conn.query(sql, userId, (err, results) => {
        if (err) {
          return res.status(400).end();
        }

        if (results.length) {
          res.status(200).json(results);
        } else {
          notFoundAuthor(res);
        }
      });
    }
  );

router
  .route('/:id')
  .get(
    [param('id').notEmpty().withMessage('작가id 필요'), validate],
    (req, res, next) => {
      const id = parseInt(req.params.id);

      const sql = 'SELECT * FROM authors WHERE id = ?';
      conn.query(sql, id, (err, results) => {
        if (err) {
          return res.status(400).end();
        }

        if (results.length) {
          res.status(200).json(results);
        } else {
          notFoundAuthor(res);
        }
      });
    }
  )
  .put(
    [
      param('id').notEmpty().withMessage('작가 id 필요'),
      body('name').notEmpty().isString().withMessage('작가 이름 필요'),
      validate,
    ],
    (req, res, next) => {
      const id = parseInt(req.params.id);
      const { name } = req.body;

      const sql = 'UPDATE authors SET name = ? WHERE id = ?';
      const values = [name, id];
      conn.query(sql, values, (err, results) => {
        if (err) {
          return res.status(400).end();
        }

        if (results.affectedRows === 0) {
          res.status(400).end();
        } else {
          res.status(200).json(results);
        }
      });
    }
  )
  .delete(
    [param('id').notEmpty().withMessage('작가id 필요'), validate],
    (req, res, next) => {
      const id = parseInt(req.params.id);

      const sql = 'DELETE FROM authors WHERE id = ?';
      conn.query(sql, id, (err, results) => {
        if (err) {
          return res.status(400).end();
        }

        if (results.affectedRows === 0) {
          res.status(400).end();
        } else {
          res.status(200).json(results);
        }
      });
    }
  );

function notFoundAuthor(res) {
  res.status(404).json({
    message: '작가 정보를 찾을 수 없습니다.',
  });
}

module.exports = router;
