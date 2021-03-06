
const pg = require("pg")
    // host:'35.201.13.235',
    //port:5432,


const pgCfg = {
    host:'/cloudsql/my-iot-273820:australia-southeast1:iot',
    user:'postgres',
    password:'postgres',
    database:'iot',
    ssl:false,
}

var pgPool;
if(!pgPool){
    pgPool = new pg.Pool(pgCfg)
}


/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
//db function to query temperatures table
exports.getFailures = async (req, res) => {
    console.log(req.body)
    res.set('Access-Control-Allow-Origin', "*")
    res.set('Access-Control-Allow-Methods', 'GET, POST')
    try {
        const resTemp = await pgPool.query("SELECT * FROM FAILURES")
        if(!!resTemp) {
            res.status(200).json(resTemp.rows)
        } else {
            res.status(500).json({error: 'No data available' })
        }
    } catch (err) {
        res.status(500).json({error: 'Internal Server Error : ' + err.message})
    }
}


