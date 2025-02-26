const express = require('express');
const router = express.Router();
const conn = require('../mariadb');

router.use(express.json());

router
  .route('/')
  .post((req, res) => {
    const { name, userId } = req.body;
    if (name && userId) {
      const sql = 'INSERT INTO authors (name, user_id) VALUES(?, ?)';
      const values = [name, userId];
      conn.query(sql, values, (err, results) => {
        res.status(201).json(results);
      });
    } else {
      res.status(400).json({
        message: '요청 값을 제대로 보내주세요',
      });
    }
  })
  .get((req, res) => {
    const { userId } = req.body;

    const sql = 'SELECT * FROM authors WHERE user_id = ?';
    if (userId) {
      conn.query(sql, userId, (err, results) => {
        if (results.length) {
          res.status(200).json(results);
        } else {
          notFoundAuthor(res);
        }
      });
    } else {
      res.status(400).end();
    }
  });

router
  .route('/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);

    const sql = 'SELECT * FROM authors WHERE id = ?';
    conn.query(sql, id, (err, results) => {
      if (results.length) {
        res.status(200).json(results);
      } else {
        notFoundAuthor(res);
      }
    });
  })
  .put((req, res) => {
    const id = parseInt(req.params.id);
    let author = db.get(id);

    if (!author) {
      notFoundAuthor(res);
    }

    let existingAuthor = author.author;
    let newAuthor = req.body.author;
    author.author = newAuthor;

    res.status(200).json({
      message: `작가 이름이 정상적으로 수정되었습니다 기존 ${existingAuthor}에서 ${newAuthor}로 수정되었습니다.`,
    });
  }) // 작가 채널 개별 수정
  .delete((req, res) => {
    const id = parseInt(req.params.id);

    let author = db.get(id);
    if (author) {
      db.delete(id);

      res.status(200).json({
        message: `${author.author}(이)가 삭제되었습니다.`,
      });
    } else {
      notFoundAuthor(res);
    }
  }); // 작가 채널 개별 삭제

function notFoundAuthor(res) {
  res.status(404).json({
    message: '작가 정보를 찾을 수 없습니다.',
  });
}

module.exports = router;
