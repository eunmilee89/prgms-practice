const express = require('express');
const router = express.Router();

router.use(express.json());

let db = new Map();

// 로그인 : POST /login
router.post('/login', (req, res) => {
  const { userId, password } = req.body;

  if (!userId || !password) {
    return res.status(400).json({ message: '입력 값을 다시 확인해주세요.' });
  }

  let foundUser;

  db.forEach((user) => {
    if (user.userId === userId) {
      foundUser = user;
    }
  });

  if (!foundUser) {
    return res.status(404).json({ message: '존재하지 않는 사용자입니다.' });
  }

  if (foundUser.password !== password) {
    return res.status(400).json({ message: '비밀번호가 틀렸습니다.' });
  }

  return res.status(200).json({ message: `${foundUser.name}님 환영합니다.` });
});

// 회원 가입 : POST /join
router.post('/join', (req, res) => {
  const { userId, password, name } = req.body;

  if (userId || password || name) {
    db.set(userId, req.body);
    res.status(201).json({
      message: `${db.get(userId - 1).name}님 환영합니다.`,
    });
  } else {
    res.status(400).json({
      message: `입력 값을 다시 확인해주세요.`,
    });
  }
});

router
  .route('/users')
  .get((req, res) => {
    // 회원 개별 조회 : GET /users/:id
    const { userId } = req.body;

    const user = db.get(userId);
    if (user) {
      res.status(200).json({
        userId: user.userId,
        name: user.name,
      });
    } else {
      res.status(404).json({
        message: `존재하는 회원이 없습니다.`,
      });
    }
  })
  .delete((req, res) => {
    // 회원 개별 탈퇴 : DELETE /users/:id
    const { userId } = req.body;

    const user = db.get(userId);
    if (user) {
      db.delete(userId);
      res.status(200).json({
        message: `${user.name}님 다음에 또 뵙겠습니다.`,
      });
    } else {
      res.status(404).json({
        message: `존재하는 회원이 없습니다.`,
      });
    }
  });

module.exports = router;
