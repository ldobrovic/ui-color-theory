 let submission = []
console.log(next)
 function color_grid(colors){

     $.each(colors, function(index,value){
           let block = $('<div  class="color-block col-2 m-3" style="background-color:'+value+'">')
           $('#color-grid').append(block)
           block.click(function(e){
               if(block.hasClass("block-border")){
                    block.removeClass("block-border")
                    submission.splice(submission.indexOf(value),1)  

               } else{
                   block.addClass("block-border")
                   submission.push(value)
               }
           })

     })
 }

 function checkColorAnswers(){
     let answers = data.answer
     if (submission === answers){
         return true;
     }
     if(submission ==null||answers==null){
         return false;
     }
     if(submission.length!==answers.length){
         return false;
     }
     submission.sort()
     answers.sort()
     for(let i = 0;i<answers.length; ++i){
         if(answers[i]!==submission[i]) return false;
     }
     return true;

 }

 function showCorrectGrid(){
    $('#color-grid').empty()
    $.each(data.images, function(index,value){
        let block = $('<div  class="color-block col-2 m-3" style="background-color:'+value+'">')
        $('#color-grid').append(block)
       if(data.answer.includes(value)){
           block.addClass('correct-border')
       } else if(submission.includes(value)&& !(data.answer.includes(value))){
           block.addClass('wrong-border')
       }
  })
  let count=0
  for(let i = 0;i<submission.length; ++i){
   if(data.answer.includes(submission[i])){
       count++;
        }
    }

  return count
    
 }
//***************OUTFIT FUNCTIONS*******************/
function outfit_grid(images){
    $.each(images, function(index,value){
        let block = $('<div  class="col-3 m-1 justify-content-center">')
        let img  = $('<img class="draggable '+value.type+'" src="'+value.image+'" alt="'+value.description+'">')

        if(index<3){
            img.addClass("height-100")
        } else {
            img.addClass("height-150")
        }
        img.draggable({
            cursor: "crosshair",
            revert: "invalid", 
        })
        block.append(img)
        $('#color-grid').append(block)
  })

 }

 function makeOutfit(){
    let clothes = $('<div class="col-3">')
    let top = $(' <div class="row droppable my-1 px-1 " id="top">')
    top.text('Drop your top here!')
    top.droppable({
        drop: function(event, ui){

            let drag = ui.draggable
            $('#color-grid').empty()
            outfit_grid(data.images)
            drag.removeAttr("style");
            top.text('')
            top.append(drag)
            if(!submission.includes(drag.attr('alt'))){
                submission[0]=drag.attr('alt');
            } 
            console.log(submission[0])
        },
        accept: '.top'
    })
    let bottom = $(' <div class="row droppable my-1 px-1 " id="bottom">')
    bottom.text('Drop your bottom here!')
    
    bottom.droppable({
        drop: function(event, ui){
            let drag = ui.draggable
            $('#color-grid').empty()
            outfit_grid(data.images)
            drag.removeAttr("style");
            bottom.text("")
            bottom.append(drag)
            if(!submission.includes(drag.attr('alt'))){
                submission[1]=drag.attr('alt');
            } 
            console.log(submission[1])

        },
        accept: '.bottom'
    })
    let accesory = $('<div class="col-3 droppable m-1 " id="accesory">')
    accesory.text('Drop your accesory here!')
    
    accesory.droppable({
        drop: function(event, ui){
            let drag = ui.draggable
            $('#color-grid').empty()
            outfit_grid(data.images)
            drag.removeAttr("style");
            accesory.text("")

            accesory.append(drag)
            if(!submission.includes(drag.attr('alt'))){
                submission[2]=drag.attr('alt');
            } 
            console.log(submission[2]) 
        },
        accept: '.accesory'
    })
    clothes.append(top)
    clothes.append(bottom)
    
    $('#drop-grid').append(clothes)
    $('#drop-grid').append(accesory)

 }

 function checkOutfit(wrong_colors,next){
    let count=0
    if(next==4){
        for(let i = 0;i<wrong_colors.length; ++i){
            if(submission.includes(wrong_colors[i])){
                count++;
                 }
             }
         
           return count
    }  else {
        let pair1 = wrong_colors[0]
        let pair2 = wrong_colors[1]
        if(submission.includes(pair1[0])){
            if(submission.includes(pair1[1])){
                if(!(submission.includes(pair2[1])||submission.includes(pair2[0]))){
                    return 1
                }
            } 
        }
        if(submission.includes(pair2[0])){
            if(submission.includes(pair2[1])){
                if(!(submission.includes(pair1[1])||submission.includes(pair1[0]))){
                    return 1
                }
            }
        }
    }
    return 3
  

 }
/************************question 5****************************/
function img_grid(images){
    $.each(images, function(index,value){
        let block = $('<div  class="col-2 justify-content-center">')
        let img  = $('<img class="color-block height-150" src="'+value.image+'" alt="'+value.description+'">')

        block.append(img)
        $('#color-grid').append(block)
        img.click(function(e){
            if(img.hasClass("block-border")){
                 img.removeClass("block-border")
                 submission=[]  

            } else{
                $(".block-border").removeClass("block-border")
                submission = []
                img.addClass("block-border")
                submission.push(value)
            }
        })
  })

 }
 

 $(document).ready(function(){
    if(next==2 || next==3){
        color_grid(data.images)
        $('#submit').click(function(e){
       

            let correct = showCorrectGrid()
            let ans = $('<div class="col-12 feedback">')
            if(checkColorAnswers()){
                ans.text('Good Job! You got all correct.')
            } else if(correct>0){
                ans.text('Nice Try! You got '+correct+' correct. Right answers are in green!')
            } else {
                ans.text('Try selecting some color blocks next time! You got '+correct+' correct. Right answers are in green!')
            }
           $('#color-grid').append(ans)
           $('#submit').remove()
           let nextQ =  $('<a href="/quiz/'+next+'" class="btn btn-primary mx-1">')
           nextQ.text('Next Question')
           $('.quiz-buttons').append(nextQ)
        })

    } else if(next==4||next==5){
        outfit_grid(data.images)
        makeOutfit()
        $('#submit').click(function(e){
            let ans = $('<div class="col-12 feedback">')
            if (submission.length<2){
                ans.text('Please make your outfit!')
                $('#drop-grid').append(ans)
            } else {
                let colors = checkOutfit(data.answer,next)
           
                if(colors==0){
                    ans.text("Good Job! Don't be afraid to use color next time!")
                   
                } else if (colors<2){
                    ans.text('Good Job!')
    
                } else {
                    if(next==4){
                        ans.text('Try selecting less color next time. ')

                    } else {
                        ans.text('Try selecting an analogous pair with a neutral next time. ')
                    }
    
                }
               $('#drop-grid').append(ans)
               $('#submit').remove()
               let nextQ =  $('<a href="/quiz/'+next+'" class="btn btn-primary mx-1">')
               nextQ.text('Next Question')
               $('.quiz-buttons').append(nextQ)
            $('.draggable').draggable( "disable" )

            }
            
        })

    } else {
        img_grid(data.images)
        $('#submit').click(function(e){
            let ans = $('<div class="col-12 feedback">')
            if(submission.length==0){
                ans.text("Please choose an outfit")
            } else {
                $('.feedback').remove()
                ans.text("Correct! Any outfit you like is best :)")
                $('#submit').remove()
                let nextQ =  $('<a href="/quiz/'+next+'" class="btn btn-primary mx-1">')
                nextQ.text('Next Question')
                $('.quiz-buttons').append(nextQ)
            }
            $(".block-border").addClass('correct-border')
            $('img').off('click');
            $('#drop-grid').append(ans)
           

        })

        
       

    }

   

 })