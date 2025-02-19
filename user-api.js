const express = require('express');
const app = express();
app.listen(7777);
app.use(express.json());

let db = new Map();
let id = 1;

// 로그인 : POST /login
app.post('/login', (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
  }

  let foundUser;

  for (const id of db.keys()) {
    const user = db.get(id);
    if (user.userId === userId) {
      foundUser = user;
      break;
    }
  }

  if (!foundUser) {
    return res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
  }

  if (foundUser.password !== password) {
    return res.status(401).json({ message: '비밀번호가 틀렸습니다.' });
  }

  res.status(200).json({ message: `${foundUser.name}님 환영합니다.` });
});

// 회원 가입 : POST /join
app.post('/join', (req, res) => {
  const { userId, password, name } = req.body;

  if (userId || password || name) {
    db.set(id++, req.body);
    res.status(201).json({
      message: `${db.get(id - 1).name}님 환영합니다.`,
    });
  } else {
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요.`,
    });
  }
});

// 회원 개별 조회 : GET /users/:id
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const user = db.get(id);
  if (!user) {
    res.status(404).json({
      message: `존재하는 회원이 없습니다.`,
    });
  } else {
    res.status(200).json({
      userId: user.userId,
      name: user.name,
    });
  }
});

// 회원 개별 탈퇴 : DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const user = db.get(id);
  if (!user) {
    res.status(404).json({
      message: `존재하는 회원이 없습니다.`,
    });
  } else {
    db.delete(id);
    res.status(200).json({
      message: `${user.name}님 다음에 또 뵙겠습니다.`,
    });
  }
});
