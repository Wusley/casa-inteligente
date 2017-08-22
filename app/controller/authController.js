module.exports = function( router ) {

  router.get( '/auth', function( req, res, next ) {

    res.render( 'auth', {} );

  } );

};
