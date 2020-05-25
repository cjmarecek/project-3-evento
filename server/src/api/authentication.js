const { Router } = require('express');
const router = Router();

// usernames are keys and passwords are values
const users = {
  username: 'password',
};

router.post('/', (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).send('Missing username or password')
    if (!users[username]) return res.status(403).send('User does not exist');
    if (users[username] !== password)
      return res.status(403).send('Incorrect password');
    return res.json({ token: 'thisIsARealToken' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
