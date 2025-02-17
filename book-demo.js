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

// 전체 조회
app.get('/books', (req, res) => {
  res.json({
    message: '책 전체 조회',
  });
});

// 개별 조회
app.get('/books/:id', (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  // console.log(id);
  const book = db.get(id);
  if (!book) {
    res.json({
      message: '없는 책입니다.',
    });
  } else {
    book.id = id; // book['id'] = id;
    res.json(book);
  }
});

// JSON 요청을 처리하는 미들웨어
app.use(express.json());

// POST 요청 (책 추가)
app.post('/books', (req, res) => {
  // body에 숨겨져서 들어온 데이터를 화면에 출력
  db.set(id++, req.body);
  res.json({
    message: `${db.get(id - 1).title} 책이 추가되었습니다.`,
  });
});
