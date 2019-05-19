const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');



//Set Storage Engine
const storage = multer.diskStorage({
  destination: './public/avatars/',
  filename:function(req, file, cb){
    cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
  }
});

//Init Upload
const upload = multer({
  storage: storage,
  limits: {fileSize: 100000000},
  fileFilter: function(req, file, cb){
    checkFileType(file, cb);
  }
}).single('avatar');

//Check File type
function checkFileType(file, cb){
  //Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  //Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  //check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Помилка: файл повинен бути зображенням!');
  }
}

//init app
const app = express();

//EJS
app.set('view engine','ejs');

//Public folder
app.use(express.static('./public'));

app.get('/', (req, res) => res.render('profile'));

app.post('/upload', (req, res)=>{
  upload(req, res, (err)=>{
    if(err){
      res.render('profile', {
        msg:err
      });
    } else {
      if (req.file == undefined) {
        res.render('profile', {
          msg: 'Помилка: не вибрано жодного файлу!'
        });
      } else {
        res.render('profile', {
          msg: 'Фото змінено!',
          file: `avatars/${req.file.filename}`
        });
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(`Server started on port ${port}`));
