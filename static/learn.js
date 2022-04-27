


$(document).ready(function(){

    $(".img_hover").hover(function() {
        $(this).addClass('full_opacity');
    })
   
    $('img').mapster({
        
        stroke: true,
        strokeOpacity: 1.0,
        strokeColor: 'black',
        strokeWidth: 3,
        mapKey: 'alt',
        areas: [
            {
                key: 'yellow',
                includeKeys: 'lightOrange, lightGreen',
                isSelectable: false,
                
                render_highlight: { 
                    fillColor:'fefe2f',
                    fillOpacity:1,
                },
              
                
            },
            {
                key: 'lightOrange',
                includeKeys: 'yellow, orange',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'fabd00',
                    fillOpacity:1,

                }

            },
            {
                key: 'orange',
                includeKeys: 'lightOrange, redOrange',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'fb9a00',
                    fillOpacity:1,

                }

            },
            {
                key: 'redOrange',
                includeKeys: 'orange, red',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'fd5202',
                    fillOpacity:1,

                }

            },
            {
                key: 'red',
                includeKeys: 'redOrange, deepRed',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'fe220a',
                    fillOpacity:1,

                }

            },
            {
                key: 'deepRed',
                includeKeys: 'red, purple',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'a9124a',
                    fillOpacity:1,

                }


            },
            {
                key: 'purple',
                includeKeys: 'navy, deepRed',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'8700b0',
                    fillOpacity:1,

                }

            },
            {
                key: 'navy',
                includeKeys: 'purple, blue',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'3b00a5',
                    fillOpacity:1,

                }

            },
            {
                key: 'blue',
                includeKeys: 'navy, lightBlue',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'0045fe',
                    fillOpacity:1,

                }

            },
            {
                key: 'lightBlue',
                includeKeys: 'blue, green',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'0093cf',
                    fillOpacity:1,

                }

            },
            {
                key: 'green',
                includeKeys: 'lightBlue, lightGreen',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'66b22e',
                    fillOpacity:1,

                }

            },
            {
                key: 'lightGreen',
                includeKeys: 'yellow, green',
                isSelectable: false,
                render_highlight: { 
                    fillColor:'d1eb27',
                    fillOpacity:1,

                }

            },
        ],
       
    });

        

 
  
   
})