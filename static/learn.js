


$(document).ready(function(){

    num_images =$('.img_tag').length
    a = Array(num_images).fill(0)
    descriptions = $('.img_description');

    for (let i=0; i<descriptions.length; i++) {

        let id = $(descriptions[i]).attr("id")[1];

        images = $('.img_tag');
        for (let j=0; j<images.length; j++) {
        
            let img_id = $(images[j]).attr("id")[1];
          
            if (id == img_id) {

                $(descriptions[i]).width($(images[j]).width());

                let left_marg = $(images[j]).css("margin-left");
                left_marg = parseFloat(left_marg.slice(0, -1));


                let top = Math.abs( $(images[j]).height() - $(descriptions[i]).height())
                
                console.log("top",top)
                console.log("leftm",left_marg)

                $(descriptions[i]).css(
                    "top", top
                )
                $(descriptions[i]).css(
                    "left", left_marg
                )
            }
        }
    }


    $(".img_hover").hover(function() {
        child = $(this).children().css({"class": "img_tag"});
        id = $(child[0]).attr("id")[1];
        $(child[0]).addClass("full_opacity");
        width = $(child[0]).width()
        a[id-1] = 1
        let result = a.every(function (e) {
            return e == 1;
        })
        if (result) {
            $("#next_btn").removeClass("btn-secondary");
            $("#next_btn").addClass("btn-primary");
        }
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