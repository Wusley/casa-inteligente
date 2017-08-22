module.exports = function( router ) {

  router.get( '/cover', function( req, res, next ) {

    res.render( 'cover', {} );

  } );

};
