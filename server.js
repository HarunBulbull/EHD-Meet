const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require("path");

const app = express()
app.use(cors())
app.use(bodyParser.json({ charset: 'utf-8', limit: '2000kb' }));
app.use(express.static('public'));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single('image'), (req,res) =>{
    res.json(req.file);
})


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'meeting'
})

app.listen(8081, () => {
    console.log("listening");
})

app.post('/inviteuser', (req, res) => {
    const sender = req.body.sender;
    const receiver = req.body.receiver;
    const roomid = req.body.roomid;

    const sql = "INSERT INTO notifications (sendername, receiverid, roomid) VALUES (?, ?, ?)";
    db.query(sql, [sender, receiver, roomid], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "Davet gönderilirken bir hata oluştu!" });
        }
        return res.json({ success: true, message: "Davet başarıyla gönderildi!" });
    });
});

app.post('/login', (req, res) => {
    const un = req.body.un;
    const pwd = req.body.pwd;
    const sql = "Select * from users where mail=? and password=?";
    db.query(sql, [un, pwd], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.post('/getName', (req, res) => {
    const id = req.body.id;
    const sql = "Select name from users where id=?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.get('/allusers', (req, res) => {
    const sql = "Select * from users order by name ASC";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/allNews', (req, res) => {
    const sql = "Select * from news order by date desc";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.get('/allNotifications', (req, res) => {
    const sql = "Select * from notifications order by date desc";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
})

app.post('/getAdminbyID', (req, res) => {
    const id = req.body.id;
    const sql = "Select isAdmin from users where id=?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.post('/deleteUser', (req, res) => {
    const id = req.body.id;

    const sql = "delete from users WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "Üye silme hatası!" });
        }
        return res.json({ success: true, message: "Üye başarıyla silindi!" });
    });
});

app.post('/createUser', (req, res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const password = req.body.password;
    const admin = req.body.admin;

    const sql = "INSERT INTO users (name,mail,password,isAdmin) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, mail, password, admin], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "Üye kaydetme hatası!" });
        }
        return res.json({ success: true, message: "Üye başarıyla kaydedildi!" });
    });
});

app.post('/updateUser', (req, res) => {
    const name = req.body.name;
    const mail = req.body.mail;
    const password = req.body.password;
    const admin = req.body.admin;
    const id = req.body.id;

    const sql = "update users set name= ?, mail = ?, password = ?, isAdmin = ? WHERE id = ?";
    db.query(sql, [name, mail, password, admin, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "Üye güncelleme hatası!" });
        }
        return res.json({ success: true, message: "Üye başarıyla güncellendi!" });
    });
});

app.post('/getMailUnique', (req, res) => {
    const id = req.body.name;
    const sql = "Select mail from users where mail=?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});

app.post('/createNew', (req, res) => {
    const header = req.body.header;
    const content = req.body.content;
    const img = req.body.img;

    const sql = "INSERT INTO news (header, content, img) VALUES (?, ?, ?)";
    db.query(sql, [header, content, img], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "Haber kaydetme hatası!" });
        }
        return res.json({ success: true, message: "Haber başarıyla kaydedildi!" });
    });
});

app.get('/', (req, res) => {
    const sql = 'select * from news';
    db.query(sql, (err, result) => {
        if(err) return res.json("Error");
        return res.json(result);
    })
})

app.post('/deleteNew', (req, res) => {
    const id = req.body.id;

    const sql = "delete from news WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "Haber silme hatası!" });
        }
        return res.json({ success: true, message: "Haber başarıyla silindi!" });
    });
});

app.post('/updateNew', (req, res) => {
    const header = req.body.header;
    const content = req.body.content;
    const img = req.body.img;
    const id = req.body.id;

    const sql = "update news set header = ?, content = ?, img = ? WHERE id = ?";
    db.query(sql, [header, content, img, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: "Haber güncelleme hatası!" });
        }
        return res.json({ success: true, message: "Haber başarıyla güncellendi!" });
    });
});

app.post('/getNew', (req, res) => {
    const id = req.body.id;
    const sql = "Select * from news where id=?";
    db.query(sql, [id], (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    })
});