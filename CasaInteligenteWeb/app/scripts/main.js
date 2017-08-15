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

const rootRef = firebase.database().ref('casa-1').once('value');

rootRef
  .then(function(snapshot) {

    // console.log( snapshot );

    let tools = snapshot.val();

    for( let slug in tools ) {

      let tool = tools[ slug ];

      let $templTool = $('<li class="item">\
                            <label for="' + slug + '">\
                              <input type="checkbox" ' + ( tool.status ? 'checked' : '' ) + ' id="' + slug + '" name="' + slug + '" value="">\
                              <div class="tool tool-' + tool.id + '">\
                                <div class="name">' + tool.name + '</div>\
                                <div class="time"><span class="started">' + tool.started + '</span></div>\
                              </div>\
                            </label>\
                          </li>');

      $( '.tools' ).append( $templTool );

        // tools.push( data );

    }

  } );
