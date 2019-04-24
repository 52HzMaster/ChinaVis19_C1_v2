let express = require('express');
let router = express.Router();
let MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://localhost:27017/chinavis19';

router.get('/day1_pro', function(req, res, next) {

    let selectData = function (db, callback) {
        //连接到表
        let collection = db.collection('day1_pro');
        //查询数据
        collection.find({area:{$ne:"area_other"},
            $and:[{area:{$ne:"area_ladder1"}},{area:{$ne:"area_ladder2"}},{area:{$ne:"area_ladder3"}},{area:{$ne:"area_ladder4"}}
            ]}, {
            "_id": 0,
            'sid':0,
            'floor':0,
            "stay":0,
            "x":0,
            "y":0
        }).toArray(function (err, result) {
            if (err) {
                console.log('Error:' + err);
                return;
            }
            callback(result);
        });
    }

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {

            // result.sort(function (a,b) {
            //     return new Date(a.date).getTime() - new Date(b.date).getTime();
            // });
            //let nest = d3.nest().key((d)=>d.id);
            //console.log(result);
            res.json(result);
            db.close();
        });
    });

});
router.get('/day1_pro_area', function(req, res, next) {

    console.log(req.query.area);
    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_pro');
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
router.get('/day1_pro_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_pro');
        console.log(req.query.id);
        //查询数据
        //,area:{$ne:"area_other"},
        //             $and:[{area:{$ne:"area_ladder1"}},{area:{$ne:"area_ladder2"}},{area:{$ne:"area_ladder3"}},{area:{$ne:"area_ladder4"}}]}
        //date:{$lte:"2019-01-01 12:00:00"}
        collection.find({id:parseInt(req.query.id),floor:parseInt(req.query.floor)}, {
            "_id":0,
            'id':0,
            'sid':0,
            'floor':0,
            "stay":0,
            //"x":0,
            //"y":0,
            //"area":0,
            //"date":0
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
router.get('/day1_pro_date', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_pro');
        //查询数据
        let start = new Date(req.query.date_start);
        start.setHours(start.getHours()+8)
        let end = new Date(req.query.date_end);
        end.setHours(end.getHours()+8)
        console.log(start,end);
        collection.find({date:{$gte:start,$lte:end},area:{$ne:"area_other"}, $and:[{area:{$ne:"area_ladder1"}},{area:{$ne:"area_ladder2"}},{area:{$ne:"area_ladder3"}},{area:{$ne:"area_ladder4"}}]},{
            "_id":0,
            'sid':0,
            'floor':0,
            "stay":0,
            "x":0,
            "y":0
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

router.get('/day2_pro', function(req, res, next) {

    let selectData = function (db, callback) {
        //连接到表
        let collection = db.collection('day2_pro');
        //查询数据
        collection.find({}, {
            "_id": 0,
        }).toArray(function (err, result) {
            if (err) {
                console.log('Error:' + err);
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
router.get('/day2_pro_area', function(req, res, next) {

    console.log(req.query.area);
    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day2_pro');
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
router.get('/day2_pro_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day2_pro');
        console.log(req.query.id,req.query.floor);
        //查询数据
        //,area:{$ne:"area_other"},
        //             $and:[{area:{$ne:"area_ladder1"}},{area:{$ne:"area_ladder2"}},{area:{$ne:"area_ladder3"}},{area:{$ne:"area_ladder4"}}]}
        //date:{$lte:"2019-01-01 12:00:00"}
        collection.find({id:parseInt(req.query.id),floor:parseInt(req.query.floor)}, {
            "_id":0,
            'id':0,
            'sid':0,
            'floor':0,
            "stay":0,
            //"area":0,
            // "date":0
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
router.get('/day2_pro_date', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day2_pro');
        //查询数据
        let start = new Date(req.query.date_start);
        start.setHours(start.getHours()+8)
        let end = new Date(req.query.date_end);
        end.setHours(end.getHours()+8)
        console.log(start,end);
        collection.find({date:{$gte:start,$lte:end}},{
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

router.get('/day3_pro', function(req, res, next) {

    let selectData = function (db, callback) {
        //连接到表
        let collection = db.collection('day3_pro');
        //查询数据
        collection.find({}, {
            "_id": 0
        }).toArray(function (err, result) {
            if (err) {
                console.log('Error:' + err);
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
router.get('/day3_pro_area', function(req, res, next) {

    console.log(req.query.area);
    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day3_pro');
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
router.get('/day3_pro_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day3_pro');
        console.log(req.query.id,req.query.floor);
        //查询数据
        //,area:{$ne:"area_other"},
        //             $and:[{area:{$ne:"area_ladder1"}},{area:{$ne:"area_ladder2"}},{area:{$ne:"area_ladder3"}},{area:{$ne:"area_ladder4"}}]}
        //date:{$lte:"2019-01-01 12:00:00"}
        collection.find({id:parseInt(req.query.id),floor:parseInt(req.query.floor)}, {
            "_id":0,
            'id':0,
            'sid':0,
            'floor':0,
            "stay":0,
            //"area":0,
            // "date":0
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
router.get('/day3_pro_date', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day3_pro');
        //查询数据
        let start = new Date(req.query.date_start);
        start.setHours(start.getHours()+8)
        let end = new Date(req.query.date_end);
        end.setHours(end.getHours()+8)
        console.log(start,end);
        collection.find({date:{$gte:start,$lte:end}},{
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

router.get('/day1_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_id');
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
router.get('/day2_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day2_id');
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
router.get('/day3_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day3_id');
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
    res.render('index', { title: 'ChinaVis19_C1' });
});

module.exports = router;
