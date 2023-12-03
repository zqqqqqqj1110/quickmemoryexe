const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3001;

const pool = mysql.createPool({
  host: '134.175.58.153',
  user: 'sudu',
  password: 'root123',
  database: 'sudu',
  port: 3306,
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/TXT');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 新的文件上传端点
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = req.file.originalname;

  // 将文件名插入到数据库中
  const insertFileNameQuery = 'INSERT INTO files (file_name) VALUES (?)';

  pool.query(insertFileNameQuery, [fileName], (error, results) => {
    if (error) {
      console.error('Database insert error:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('File name inserted into database successfully.');
      res.send('File uploaded successfully');
    }
  });
});




// 文件列表端点
app.get('/fileList', (req, res) => {
  const fileListQuery = `SELECT file_name FROM files`;
  
  pool.query(fileListQuery, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    const fileNames = results.map(result => result.file_name);
    res.json(fileNames);
  });
});



// 登陆
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const selectUserQuery = `SELECT * FROM user WHERE account = ?`;

  pool.query(selectUserQuery, [username], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    if (results.length > 0) {
      // 用户存在，验证密码
      const storedPassword = results[0].password;

      if (password === storedPassword) {
        // 密码验证成功
        console.log('Login successful.');
        if (results[0].time === 0) {
          console.log('试用已结束！');
          res.status(401).send('Unauthorized');
        } else {
          // 更新 time 值
          if (results[0].is_vip === 0) {
            const updateQuery = `UPDATE user SET time = time - 1 WHERE account = ?`;
            pool.query(updateQuery, [username], (updateError, updateResults) => {
              if (updateError) {
                console.error('Database update error:', updateError);
                res.status(500).send('Internal Server Error');
              } else {
                console.log('Time updated successfully.');
                res.json({ isVip: results[0].is_vip, time: results[0].time - 1 });
              }
            });
          } else {
            res.json({ isVip: results[0].is_vip, time: results[0].time });
          }
        }
      } else {
        // 密码验证失败
        console.error('Invalid password.');
        res.status(401).send('Unauthorized');
      }
    } else {
      // 用户不存在，插入新用户信息
      const insertQuery = `INSERT INTO user (account, password, is_vip, time) VALUES (?, ?, 0, 5)`;

      pool.query(insertQuery, [username, password], (insertError, insertResults) => {
        if (insertError) {
          console.error('Database insert error:', insertError);
          res.status(500).send('Internal Server Error');
        } else {
          console.log('New user added successfully.');
          res.json({ time: 5 });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
