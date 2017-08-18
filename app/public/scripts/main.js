'use strict';

const toolsRef = firebase.database().ref( 'casa-1/tools' );

toolsRef
  .once( 'value' )
    .then( function( snapshot ) {

      let tools = snapshot.val(),
          $tools = $( '.tools' );

      for( let id in tools ) {

        if( tools.hasOwnProperty( id ) ) {

          let tool = tools[ id ];

          let $templTool = $('<li class="item js-tool ' + ( tool.status ? 'on' : 'off' ) + '" id="tool-' + tool.id + '" data-status="' + tool.status + '" >\
                                <div class="tool tool-' + tool.id + '">\
                                  <div class="name">' + tool.name + '</div>\
                                  <div class="time"><span class="started">' + tool.init + '</span></div>\
                                </div>\
                              </li>');

          $( '.tools' ).append( $templTool );

        }

      }

      $tools
        .find( '.js-tool' )
          .on( 'click', function() {

            let $this = $( this );
                status = $this.data( 'status' );

            $this.removeClass( 'off' );
            $this.removeClass( 'on' );
            $this.addClass( 'pulse' );

            // toolsRef.child( $this.attr( 'id' ) ).update( { status: status != 'true' } );
            toolsRef.child( $this.attr( 'id' ) ).update( { wait: true, status: status != 'true' } );

          } );

    } );

toolsRef
  .on( 'child_changed', function( snapshot ) {

    let tool = snapshot.val(),
        $target = $( '#tool-' + tool.id );

    setTimeout( function() {

      // remove wait
      // atualiza status

      $target.data( 'status', tool.status );

      $target.removeClass( 'pulse' );

      if( tool.status ) {

        $target.removeClass( 'off' );
        $target.addClass( 'on' );

      } else {

        $target.removeClass( 'on' );
        $target.addClass( 'off' );

      }
    }, 1500 );


  } );

function tesssste() {
  console.log('Hello World do teste');
}
