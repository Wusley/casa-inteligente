'use strict';

let $templTool = $('<li class="item">\
                      <label for="iluminacao-sala">\
                        <input type="checkbox" id="iluminacao-sala" name="iluminacao-sala" value="">\
                        <div class="tool tool-1">\
                          <div class="name">Iluminação Sala</div>\
                          <div class="time"><span class="started">8:10</span></div>\
                        </div>\
                      </label>\
                    </li>');

const toolsRef = firebase.database().ref( 'casa-1/tools' );

toolsRef
  .once( 'value' )
    .then( function( snapshot ) {

      let tools = snapshot.val(),
          $tools = $( '.tools' );

      for( let id in tools ) {

        if( tools.hasOwnProperty( id ) ) {

          let tool = tools[ id ];

          let $templTool = $('<li class="item" id="tool-' + tool.id + '">\
                                <label class="lbl" for="' + tool.slug + '">\
                                  <input type="checkbox" ' + ( tool.status ? 'checked' : '' ) + ' id="' + tool.slug + '" class="js-despatch" name="' + tool.slug + '" value="">\
                                  <div class="tool tool-' + tool.id + '">\
                                    <div class="name">' + tool.name + '</div>\
                                    <div class="time"><span class="started">' + tool.init + '</span></div>\
                                  </div>\
                                </label>\
                              </li>');

          $( '.tools' ).append( $templTool );

        }

      }

      $tools
        .find( '.js-despatch' )
          .on( 'click', function( e ) {

            let $this = $( this );

            toolsRef.child( $this.closest( '.item' ).prop( 'id' ) ).update( { status: $this.prop( 'checked' ) } );

          } );

    } );

toolsRef
  .on( 'child_changed', function( snapshot ) {

    let tool = snapshot.val(),
        $target = $( '#tool-' + tool.id );

        console.log( tool );

    let status = $target.find( '[type=checkbox]' ).prop( 'checked' );

    if( status !== tool.status  ) {

       $target.find( '[type=checkbox]' ).prop( 'checked', tool.status );

    }

  } );
