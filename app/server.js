const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3001;

const pool = mysql.createPool({
  host: '134.175.58.153',
  user: 'sudu',
  password: 'root123',
  database: 'sudu',
  port: 3306,
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  // 如果有需要，也可以设置 'Access-Control-Allow-Credentials' 为 true
  // res.header('Access-Control-Allow-Credentials', true);

  if (req.method === 'OPTIONS') {
    // 对于预检请求（OPTIONS），直接响应 200 OK，不再继续处理
    res.sendStatus(200);
  } else {
    // 对于其他请求，继续处理
    next();
  }
});



app.use(express.json());

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM user WHERE account = ? AND password = ?`;

  pool.query(query, [username, password], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      console.log('is_vip:', results[0].is_vip);
      res.json({ isVip: results[0].is_vip });
    } else {
      console.log('User not found');
      res.status(401).send('Unauthorized');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
