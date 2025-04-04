// express 모듈 셋팅
const express = require('express');
const app = express();
app.listen(3000);

// 데이터 셋팅
let book1 = {
  title: '모순',
  author: '양귀자',
  pages: 320,
};

let book2 = {
  title: '데미안',
  author: '헤르만 헤세',
  pages: 270,
};

let book3 = {
  title: '어린 왕자',
  author: '생텍쥐페리',
  pages: 120,
};

let db = new Map(); // key-value
let id = 1;
db.set(id++, book1);
db.set(id++, book2);
db.set(id++, book3);

// REST API 설계

// 전체 조회 (GET)
app.get('/books', (req, res) => {
  let books = {};
  db.forEach((value, key) => {
    // Map.forEach()는 (value, key, array) 순서로 동작
    books[key] = value;
  });
  res.json(books);
});

// 개별 조회 (GET)
app.get('/books/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  // console.log(id);
  const book = db.get(id);
  if (!book) {
    res.json({
      message: `요청하신 ${id}번은 없는 책입니다.`,
    });
  } else {
    book.id = id; // book['id'] = id;
    res.json(book);
  }
});

// JSON 요청을 처리하는 미들웨어
app.use(express.json());

// 책 추가 요청 (POST)
app.post('/books', (req, res) => {
  // body에 숨겨져서 들어온 데이터를 화면에 출력
  db.set(id++, req.body);
  res.json({
    message: `${db.get(id - 1).title} 책이 추가되었습니다.`,
  });
});

// 개별 삭제 요청 (DELETE)
app.delete('/books/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const book = db.get(id);

  if (!book) {
    res.json({
      message: `요청하신 ${id}번은 없는 책입니다.`,
    });
  } else {
    db.delete(id);
    res.json({
      message: `${book.title} 책이 삭제되었습니다.`,
    });
  }
});

// 전체 삭제 요청 (DELETE)
app.delete('/books', (req, res) => {
  let msg = '';
  if (db.size >= 1) {
    db.clear();
    msg = '모든 책이 삭제되었습니다.';
  } else {
    msg = '삭제할 책이 없습니다.';
  }

  res.json({
    message: msg,
  });
});

// 개별 수정 (PUT)
app.put('/books/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  const book = db.get(id);
  if (!book) {
    res.json({
      message: `요청하신 ${id}번은 없는 책입니다.`,
    });
  } else {
    let existingTitle = db.get(id).title;
    let newTitle = req.body.title;
    book.title = newTitle;
    db.set(id, book);
    res.json({
      message: `${existingTitle} 책의 이름이 ${newTitle} (으)로 변경되었습니다.`,
    });
  }
});
