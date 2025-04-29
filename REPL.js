

import {db} from './models/index.js'
db.Grade.find().then(res => console.log(res))