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
  connectTimeout: 20000,  // 设置连接超时时间为20秒
  acquireTimeout: 20000,  // 设置获取连接超时时间为20秒
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'file') {
      cb(null, 'public/JZ');
    } else if (file.fieldname === 'fontFile') {
      cb(null, 'public/Font'); // 修改为你的字体文件存储路径
    } else if (file.fieldname === 'fileSC') {
      cb(null, 'public/SC');
    } else if (file.fieldname === 'fileCY') {
      cb(null, 'public/CY');
    }
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


app.use('/fonts', express.static(path.join(__dirname, 'public/Font')));   // 字体
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// 字体文件上传端点
const fontStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/Font'); // 修改为你的字体文件存储路径
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const fontUpload = multer({ storage: fontStorage });

app.post('/upload-font', fontUpload.single('fontFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No font file uploaded.');
  }

  const fileName = req.file.originalname;

  // 将字体文件名插入到数据库中，你需要根据实际情况修改数据库表的结构
  const insertFontFileNameQuery = 'INSERT INTO font_files (file_name) VALUES (?)';

  pool.query(insertFontFileNameQuery, [fileName], (error, results) => {
    if (error) {
      console.error('Database insert error:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('Font file name inserted into database successfully.');
      res.json({ message: 'Font file uploaded successfully' });
    }
  });
});

// 文件上传端点(句子)
app.post('/upload2JZ', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = req.file.originalname;

  // 将文件名插入到数据库中
  const insertFileNameQuery = 'INSERT INTO files2JZ (file_name) VALUES (?)';

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

// 文件列表端点（句子）
app.get('/fileList2JZ', (req, res) => {
  const fileListQuery = `SELECT file_name FROM files2JZ`;
  
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


// 文件上传端点(诗词)
app.post('/upload2SC', upload.single('fileSC'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = req.file.originalname;

  // 将文件名插入到数据库中
  const insertFileNameQuery = 'INSERT INTO files2SC (file_name) VALUES (?)';

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

// 文件列表端点（诗词）
app.get('/fileList2SC', (req, res) => {
  const fileListQuery = `SELECT file_name FROM files2SC`;
  
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

// 文件上传端点(成语)
app.post('/upload2CY', upload.single('fileCY'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const fileName = req.file.originalname;

  // 将文件名插入到数据库中
  const insertFileNameQuery = 'INSERT INTO files2CY (file_name) VALUES (?)';

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

// 文件列表端点（成语）
app.get('/fileList2CY', (req, res) => {
  const fileListQuery = `SELECT file_name FROM files2CY`;
  
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


// 字体文件列表端点
app.get('/fontList', (req, res) => {
  const fontListQuery = `SELECT file_name FROM font_files`;

  pool.query(fontListQuery, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    const fontNames = results.map(result => result.file_name);
    res.json(fontNames);
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

    if (results.length > 0 && results[0].password === password) {
      // 账号和密码验证成功
      console.log('Login successful.');

      const lsAdmin = results[0].ls_admin;
      const classify = results[0].classify;

      // 将 lsAdmin 和 classify 的值传递到前端
      res.json({ isVip: results[0].is_vip, time: results[0].time, lsAdmin, classify });
    } else {
      // 账号或密码不匹配
      console.error('Invalid username or password.');
      res.status(401).send('Unauthorized');
    }
  });
});

// 超级管理员获取用户列表端点
app.get('/userList', (req, res) => {
  const userListQuery = `SELECT id, account, password, classify, ls_admin FROM user`;
  console.log('Executing query:', userListQuery);

  pool.query(userListQuery, (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
      return;
    }

    console.log('Users retrieved successfully:', results);
    res.json(results);
  });
});

// 管理员获取用户列表端点
app.get('/userListPer', (req, res) => {
  // 从请求的查询参数中获取 classify 的值
  const classify = req.query.classify;

  // 构建查询语句，如果存在 classify，则进行筛选，否则获取全部用户
  const userListQuery = classify
    ? `SELECT * FROM user WHERE classify = ?`
    : `SELECT * FROM user`;

  pool.query(userListQuery, [classify], (error, results) => {
    if (error) {
      console.error('Database query error:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('User list fetched successfully.');
      res.json(results);
    }
  });
});


// 删除用户端点
app.delete('/user/:id', (req, res) => {
  const userId = req.params.id;
  const deleteUserQuery = 'DELETE FROM user WHERE id = ?';

  pool.query(deleteUserQuery, [userId], (error, results) => {
    if (error) {
      console.error('Database delete error:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(`User with id ${userId} deleted successfully.`);
      res.json({ message: 'User deleted successfully' });
    }
  });
});

// 修改用户信息端点
app.put('/updateUser/:id', (req, res) => {
  const userId = req.params.id;
  const { is_vip, time } = req.body;

  const updateUserQuery = 'UPDATE user SET is_vip = ?, time = ? WHERE id = ?';

  pool.query(updateUserQuery, [is_vip, time, userId], (error, results) => {
    if (error) {
      console.error('Database update error:', error);
      res.status(500).send('Internal Server Error');
    } else {
      console.log(`User with id ${userId} updated successfully.`);
      res.json({ message: 'User updated successfully' });
    }
  });
});

// 超级管理员添加用户
app.post('/addUser', (req, res) => {
  const { account, password } = req.body;

  const insertUserQuery = `INSERT INTO user (account, password, ls_admin, classify) VALUES (?, ?, 1, 'default_classify')`;

  pool.query(insertUserQuery, [account, password], (insertError, insertResults) => {
    if (insertError) {
      console.error('Database insert error:', insertError);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('New user added successfully.');
      res.json({ message: 'User added successfully' });
    }
  });
});

// 管理员添加用户
app.post('/addUserPer', (req, res) => {
  const { account, password, classify } = req.body;
  console.log('Received request with classify:', classify);
  const insertUserQuery = `INSERT INTO user (account, password, ls_admin, classify) VALUES (?, ?, 0, ?)`;

  pool.query(insertUserQuery, [account, password, classify], (insertError, insertResults) => {
    if (insertError) {
      console.error('Database insert error:', insertError);
      res.status(500).send('Internal Server Error');
    } else {
      console.log('New user added successfully.');
      res.json({ message: 'User added successfully' });
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});