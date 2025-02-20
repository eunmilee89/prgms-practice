const express = require('express');
const app = express();
app.listen(7777);
app.use(express.json());

let db = new Map();
let id = 1;

app
  .route('/channels')
  .post((req, res) => {
    if (req.body.author) {
      db.set(id++, req.body);

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
    if (db.size) {
      let channels = [];
      db.forEach((value) => {
        channels.push(value);
      });

      res.status(200).json(channels);
    } else {
      res.status(404).json({
        message: '작가가 존재하지 않습니다.',
      });
    }
  }); // 작가 채널 전체 조회

app
  .route('/channels/:id')
  .get((req, res) => {
    const id = parseInt(req.params.id);

    let channel = db.get(id);
    if (channel) {
      res.status(200).json(channel);
    } else {
      res.status(404).json({
        message: '작가 정보를 찾을 수 없습니다.',
      });
    }
  }) // 작가 채널 개별 조회
  .put((req, res) => {
    const id = parseInt(req.params.id);
    let channel = db.get(id);

    if (!channel) {
      res.status(404).json({
        message: '작가 정보를 찾을 수 없습니다.',
      });
    }

    let existingAuthor = channel.author;
    let newAuthor = req.body.author;
    channel.author = newAuthor;

    res.status(200).json({
      message: `작가 이름이 정상적으로 수정되었습니다 기존 ${existingAuthor}에서 ${newAuthor}로 수정되었습니다.`,
    });
  }) // 작가 채널 개별 수정
  .delete((req, res) => {
    const id = parseInt(req.params.id);

    let channel = db.get(id);
    if (channel) {
      db.delete(id);

      res.status(200).json({
        message: `${channel.author}(이)가 삭제되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: '작가 정보를 찾을 수 없습니다.',
      });
    }
  }); // 작가 채널 개별 삭제
