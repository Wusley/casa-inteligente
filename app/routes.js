var express = require( 'express' ),
    router = express.Router();

require( './controller/panelController' )( router );
require( './controller/coverController' )( router );
require( './controller/authController' )( router );

module.exports = router;
