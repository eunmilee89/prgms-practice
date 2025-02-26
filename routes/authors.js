const express = require('express');
const router = express.Router();

router.use(express.json());

let db = new Map();
let id = 1;

router
  .route('/')
  .post((req, res) => {
    if (req.body.author) {
      let author = req.body;
      db.set(id++, author);

      res.status(201).json({
        message: `${db.get(id - 1).author}님의 글쓰기 생활을 응원합니다.`,
      });
    } else {
      res.status(400).json({
        message: '요청 값을 제대로 보내주세요',
      });
    }
  }) // 작가 채널 개별 생성
  .get((req, res) => {
    let { userId } = req.body;
    let authors = [];

    if (db.size && userId) {
      db.forEach((value) => {
        if (value.userId === userId) {
          authors.push(value);
        }
      });

      if (authors.length) {
        res.status(200).json(authors);
      } else {
        notFoundAuthor();
      }
    } else {
      notFoundAuthor();
    }
  }); // 작가 채널 전체 조회

router
  .route('/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);

    let author = db.get(id);
    if (author) {
      res.status(200).json(author);
    } else {
      notFoundAuthor();
    }
  }) // 작가 채널 개별 조회
  .put((req, res) => {
    const id = parseInt(req.params.id);
    let author = db.get(id);

    if (!author) {
      notFoundAuthor();
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
      notFoundAuthor();
    }
  }); // 작가 채널 개별 삭제

function notFoundAuthor() {
  res.status(404).json({
    message: '작가 정보를 찾을 수 없습니다.',
  });
}

module.exports = router;
