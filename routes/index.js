let express = require('express');
let router = express.Router();

let MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://localhost:27017/chinavis19';


router.get('/day1_data', function(req, res, next) {

    console.log(req.query.area);
    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_data');
        //查询数据
        collection.find({area:req.query.area},{
            "_id":0
        }).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {
            res.json(result);
            db.close();
        });
    });

});

router.get('/day1_data_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_data');
        //查询数据
        collection.find({id:parseInt(req.query.id),area:{$ne:"area_other"}},{
            "_id":0,
            "date":0
        }).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {
            res.json(result);
            db.close();
        });
    });

});

router.get('/day1_data_10min', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_data');
        //查询数据
        console.log(req.query.date_start,req.query.date_end);
        collection.find({date:{$gte:req.query.date_start,$lte:req.query.date_end}},{
            "_id":0
        }).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {
            res.json(result);
            db.close();
        });
    });

});

router.get('/day2_data', function(req, res, next) {

    console.log(req.query.area);
    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day2_data');
        //查询数据
        collection.find({area:req.query.area},{
            "_id":0
        }).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {
            res.json(result);
            db.close();
        });
    });

});
router.get('/day2_data_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day2_data');
        //查询数据
        collection.find({id:parseInt(req.query.id),area:{$ne:"area_other"}},{
            "_id":0
        }).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {
            res.json(result);
            db.close();
        });
    });

});

router.get('/day3_data', function(req, res, next) {

    console.log(req.query.area);
    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day3_data');
        //查询数据
        collection.find({area:req.query.area},{
            "_id":0
        }).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {
            res.json(result);
            db.close();
        });
    });

});
router.get('/day3_data_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day3_data');
        //查询数据
        collection.find({id:parseInt(req.query.id),area:{$ne:"area_other"}},{
            "_id":0
        }).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {
            res.json(result);
            db.close();
        });
    });

});


router.get('/sensor', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('sensor');
        //查询数据
        collection.find({},{
            "_id":0
        }).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {
            res.json(result);
            db.close();
        });
    });

});

router.get('/', function(req, res, next) {
    res.render('index', { title: '' });
});
module.exports = router;
