let express = require('express');
let router = express.Router();
let d3 = require('./d3.min');
let MongoClient = require('mongodb').MongoClient;
let DB_CONN_STR = 'mongodb://localhost:27017/chinavis19';

//all data
router.get('/day1_pro', function(req, res, next) {

    let selectData = function (db, callback) {
        //连接到表
        let collection = db.collection('day1_pro');
        //查询数据
        collection.find({area:{$ne:"area_other"},stay:{$gte:1200},
            $and:[{area:{$ne:"area_ladder1"}},{area:{$ne:"area_ladder2"}},{area:{$ne:"area_ladder3"}},{area:{$ne:"area_ladder4"}},
                {area:{$ne:"area_wc1"}},  {area:{$ne:"area_wc2"}},  {area:{$ne:"area_wc3"}},
            ]}, {
            "_id": 0,
            'sid':0,
            'floor':0,
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

//query area
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

//query id
router.get('/day1_pro_id', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_pro');
        console.log(req.query.id);
        //查询数据
        //,area:{$ne:"area_other"},
        //             $and:[{area:{$ne:"area_ladder1"}},{area:{$ne:"area_ladder2"}},{area:{$ne:"area_ladder3"}},{area:{$ne:"area_ladder4"}}]}
        //date:{$lte:"2019-01-01 12:00:00"}
        collection.find({id:parseInt(req.query.id), $and:[{area:{$ne:"area_in"}},{area:{$ne:"area_out"}}]}, {
            "_id":0,
            'id':0,
            'sid':0,
            'floor':0,
            //"stay":0,
            "x":0,
            "y":0,
            //"area":0,
            "date":0
        }).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }
            callback(result);
        });
    };

    MongoClient.connect(DB_CONN_STR, function(err, db) {
        selectData(db, function(result) {
            let area_nest = d3.nest().key((d)=>d.area);
            let data = area_nest.entries(result);

            let areas = {
                "id":req.query.id,
                "area_A":0,"area_B":0,"area_C":0,"area_D":0,
                "area_sign":0,"area_poster":0,
                "area_wc1":0,"area_wc2":0,"area_wc3":0,
                "area_room1":0,"area_room2":0,"area_room3":0,"area_room4":0,"area_room5":0,"area_room6":0,
                "area_serve":0, "area_disc":0,"area_main":0,
                "area_canteen":0,"area_leisure":0,
                "area_other":0
            };

            data.forEach((d)=>{
                let stay = 0;
                d.values.forEach((s)=>{
                    stay += s.stay;
                });
                d.values = stay;
                areas[d.key] = stay;
            });
            res.json(areas);
            db.close();
        });
    });

});

//query id >30min
router.get('/day1_pro_gt30', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_pro');
        console.log(req.query.id);
        //查询数据
        //,area:{$ne:"area_other"},
        //             $and:[{area:{$ne:"area_ladder1"}},{area:{$ne:"area_ladder2"}},{area:{$ne:"area_ladder3"}},{area:{$ne:"area_ladder4"}}]}
        //date:{$lte:"2019-01-01 12:00:00"}
        collection.find({id:parseInt(req.query.id),stay:{$gte:1800},floor:parseInt(req.query.floor)}, {
            "_id":0,
            'id':0,
            'sid':0,
            'floor':0,
            //"stay":0,
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

//query date
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

//query date
router.get('/day1_stay', function(req, res, next) {

    let selectData = function(db, callback) {
        //连接到表
        let collection = db.collection('day1_stay');
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
        collection.find({id:parseInt(req.query.id),stay:{$gte:1800},floor:parseInt(req.query.floor)}, {
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
        collection.find({id:parseInt(req.query.id),stay:{$gte:1800},floor:parseInt(req.query.floor)}, {
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
