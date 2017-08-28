'use strict';

const toolsRef = firebase.database().ref( 'casa-0/tools' );

toolsRef
  .once( 'value' )
    .then( function( snapshot ) {

      let tools = snapshot.val(),
          $tools = $( '.tools' );

      for( let id in tools ) {

        if( tools.hasOwnProperty( id ) ) {

          let tool = tools[ id ];

          let $templTool = $('<li class="item js-tool ' + ( tool.status ? 'on' : 'off' ) + '" id="tool-' + tool.id + '" data-status="' + tool.status + '" data-type="' + tool.type + '" >\
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

            let $this = $( this ),
                type = $this.data( 'type' );

            if( type === 'on-off' ) {

              changeOnOff( $this );

            } else if( type === 'time' ) {

              changeTime( $this );

            }

          } );

    } );

function changeOnOff( $this ) {
  let status = $this.data( 'status' );

  $this.removeClass( 'off' );
  $this.removeClass( 'on' );
  $this.addClass( 'pulse' );

  toolsRef.child( $this.attr( 'id' ) ).update( { wait: true, status: status != 'true' } );

}

function changeTime( $this ) {

  let status = $this.data( 'status' );

  $this.removeClass( 'off' );
  $this.removeClass( 'on' );
  $this.addClass( 'pulse' );

  setTimeout( function() {

    var val = prompt( 'Quantas vezes por dia?' );

    if( !validateTime( val ) ) {

      applyStatus( $this, status );

    }

  }, 100 );

}

function validateTime( val ) {

  let res = false;

  if( val.length ) {

    res = true;

  }

  return res;

}

toolsRef
  .on( 'child_changed', function( snapshot ) {

    let tool = snapshot.val(),
        $target = $( '#tool-' + tool.id );

    $target.data( 'status', tool.status );

    if( !tool.wait ) {

      applyStatus( $target, tool.status );

    }

  } );

function applyStatus( $element, status) {

  $element.removeClass( 'pulse' );

  if( status ) {

    $element.removeClass( 'off' );
    $element.addClass( 'on' );

  } else {

    $element.removeClass( 'on' );
    $element.addClass( 'off' );

  }

}
