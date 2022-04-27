 let submission = []
 let selected = []

 function color_grid(colors){

     $.each(colors, function(index,value){
           let block = $('<div  class="color-block col-2 m-3" style="background-color:'+value+'">')
           $('#color-grid').append(block)
           block.click(function(e){
               if(block.hasClass("block-border")){
                    block.removeClass("block-border")
                    submission.splice(submission.indexOf(value),1)
                    if (next == 3) {
                        selected.splice(selected.indexOf(block), 1)
                    }
               } else{
                   if (next == 3) {
                    if (selected.length >= 2) {
                        selected.shift().removeClass("block-border")
                        submission.splice(0, 1)
                    }
                   selected.push(block)
                   }
                   block.addClass("block-border")
                   submission.push(value)
               }
           })

     })
 }

 function highlightResults(correct) {
     if (correct) {
         selected[0].addClass("correct-border")
         selected[1].addClass("correct-border")
     } else {
        selected[0].addClass("wrong-border")
        selected[1].addClass("wrong-border")
     }
 }

 function checkColorAnswers(){
     let answers = data.answer
     if (next==3){
        for (let i=0; i<answers.length; i++) {
            if (submission.includes(answers[i][0])) {
                if (submission.includes(answers[i][1])) {
                    return true
                }
            }
        }
     } else {
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
    return false
    

 }

 function showCorrectGrid(){
 
  let count=0
  if(next==3){
    let answers = data.answer
   
       let pair1 = answers[0]
       let pair2 =answers[1]
       if(submission.includes(pair1[0])&&submission.includes(pair1[1])){
           count++
       }
       if(submission.includes(pair2[0])&&submission.includes(pair2[1])){
           count++
       }
       $('#color-grid').empty()
       $.each(data.images, function(index,value){
           let block = $('<div  class="color-block col-2 m-3" style="background-color:'+value+'">')
           $('#color-grid').append(block)
          if(pair1.includes(value)||pair2.includes(value)){
              block.addClass('correct-border')
          } 
          else if(submission.includes(value)&& !(pair1.includes(value)||pair2.includes(value))){
              block.addClass('wrong-border')
          }
     })
    

  } else {
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
    for(let i = 0;i<submission.length; ++i){
        if(data.answer.includes(submission[i])){
            count++;
             }
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
    let clothes = $('<div class="col-md-12 row stick_container">')
    let top = $(' <div class=" col-md-12 parent " id="top">')
    top.append(' <div class="torso">')
    top.append(' <div class="leftarm">')
    top.append(' <div class="rightarm">')

    let bottom = $(' <div class="col-md-12 parent" id="bottom">')
    bottom.append(' <div class="leftleg">')
    bottom.append(' <div class="rightleg">')

    head = $(' <div class=" col-md-12 ">')
    head.append(' <div class="head">')

    clothes.append(head)
    clothes.append(top)
    clothes.append(bottom)
    // top.text('Drop your top here!')
    top.droppable({
        drop: function(event, ui){

            let drag = ui.draggable
            $('#color-grid').empty()
            outfit_grid(data.images)
            drag.removeAttr("style");
            top.text('')
            // top.append(' <div class="torso">')
            // top.append(' <div class="leftarm">')
            // top.append(' <div class="rightarm">')
            top.append(drag).attr("class", "topp")
            if(!submission.includes(drag.attr('alt'))){
                submission[0]=drag.attr('alt');
            } 
        },
        accept: '.top'
    })
    
    // bottom.text('Drop your bottom here!')
    
    bottom.droppable({
        drop: function(event, ui){
            let drag = ui.draggable
            $('#color-grid').empty()
            outfit_grid(data.images)
            drag.removeAttr("style");
            bottom.text("")
           
            bottom.append(drag).attr("class", "pants")
            if(!submission.includes(drag.attr('alt'))){
                submission[1]=drag.attr('alt');
            } 
        },
        accept: '.bottom'
    })
    let accessory = $('<div class="col-md-3 text-font accessory-spacing" id="accessory">')
    accessory.text('Drop your accessory here!')
    
    accessory.droppable({
        drop: function(event, ui){
            let drag = ui.draggable
            $('#color-grid').empty()
            outfit_grid(data.images)
            drag.removeAttr("style");
            accessory.text("")

            accessory.append(drag)
            if(!submission.includes(drag.attr('alt'))){
                submission[2]=drag.attr('alt');
            } 
        },
        accept: '.accesory'
    })

    
    
   
    $('#drop-grid').append(clothes)
    // $('#drop-grid').append(clothes).attr("class", "disinlineblck")
    $('#drop-grid').append(accessory)

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
        let pair3 = wrong_colors[3]

       
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
        if(submission.includes(pair3[0])){
            if(submission.includes(pair3[1])){
                if(!(submission.includes(pair1[1])||submission.includes(pair2[0]))){
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
        let block = $('<div  class="col-md-3 justify-content-center">')
        let img  = $('<img class="color-block q5_img" src="'+value.image+'" alt="'+value.description+'">')

        block.append(img)
        $('#color-grid').append(block)
        img.click(function(e){
            if(img.hasClass("q5_highlight")){
                 img.removeClass("q5_highlight")
                 submission=[]  

            } else{
                $(".q5_highlight").removeClass("q5_highlight")
                submission = []
                img.addClass("q5_highlight")
                submission.push(value)
            }
        })
  })

 }

 function save_answers(answers,value){
    let id = next-1
    let question = "question"+id
    let item = {
        'id': question,
        'overall': value,
        'answers': submission,
    }

    $.ajax({
        type: "POST",
        url: "save_answers",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        success: function(result){
            // console.log('answers saved')
            // console.log(result["user_answers"])
        },
        error: function(request,status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }

    })
 }
 

 $(document).ready(function(){
    if(next==2){
        color_grid(data.images)
        $('#submit').click(function(e){
            let correct = showCorrectGrid()
            let ans = $('<div class="col-12 text-font feedback">')
            if(checkColorAnswers()){
                ans.text('Good Job! You got all correct.')
                save_answers(submission,1)
            } else if(correct>0){
                ans.text('Nice Try! You got '+correct+' correct. Right answers are in green!')
                save_answers(submission,0)
            } else {
                ans.text('Try selecting some color blocks next time! You got '+correct+' correct. Right answers are in green!')
                save_answers(submission,0)

            }
           $('#color-grid').append(ans)
           $('#submit').remove()
           let nextQ =  $('<a href="/quiz/'+next+'" class="btn text-font btn-primary mx-1">')
           nextQ.text('Next Question')
           $('.quiz-buttons').append(nextQ)
        })

    } else if(next==3){
        color_grid(data.images)
        $('#submit').click(function(e){
            let ans = $('<div class="col-12 text-font feedback">')
            let isCorrect = checkColorAnswers()
            let colorWheel = $('<button/>',
            {
                id: 'open',
                text: 'here',
                class: 'btn medium_bold'
               
            });
            if(isCorrect){
                ans.text('Good Job!')
                save_answers(submission,1)
            } else {
               
                ans.text('Try reviewing your colorwheel ')
                ans.append(colorWheel)
                ans. append('. Possible pairings are found next to each other on the color wheel, such as blue and purple, red and orange, or yellow and green.')
                $(".open").on("click", function () {
                    $(".popup-overlay, .popup-content").addClass("active");
                    });
                $("#close").on("click", function(){
                    $(".popup, .popup-content").removeClass("active");
                    });
                save_answers(submission,0)
            }
            
            highlightResults(isCorrect)
           $('#color-grid').append(ans)
           $('#submit').remove()
           let nextQ =  $('<a href="/quiz/'+next+'" class="btn text-font btn-primary mx-1">')
           nextQ.text('Next Question')
           $('.quiz-buttons').append(nextQ)
        })


    } 
    else if(next==4||next==5){
        outfit_grid(data.images)
        makeOutfit()
        $('#submit').click(function(e){
            $('.feedback').remove()
            let ans = $('<div class="col-12 text-font feedback">')
            if (submission.length<2){
                ans.text('Please make your outfit!')
                $('#quiz-feedback').append(ans)
            } else {
                let colors = checkOutfit(data.answer,next)
           
                if(colors==0){
                    ans.text("Good Job! Don't be afraid to use color next time!")
                save_answers(submission,1)
                   
                } else if (colors<2){
                    ans.text('Good Job!')
                    save_answers(submission,1)
    
                } else {
                    if(next==4){
                        ans.text('Try selecting less color next time. ')
                        save_answers(submission,0)

                    } else {
                        ans.text('Try selecting an analogous pair with a neutral next time. ')
                        save_answers(submission,0)
                        
                    }
    
                }
               $('#quiz-feedback').append(ans)
               $('#submit').remove()
               let nextQ =  $('<a href="/quiz/'+next+'" class="btn text-font btn-primary mx-1">')
               nextQ.text('Next Question')
               $('.quiz-buttons').append(nextQ)
            $('.draggable').draggable( "disable" )

            }
            
        })

    } else {
        img_grid(data.images)
        $('#submit').click(function(e){
            let ans = $('<div class="col-12 text-font feedback">')
            if(submission.length==0){
                ans.text("Please choose an outfit")
            } else {
                $('.feedback').remove()
                $(".q5_highlight").addClass("q5_correct")
                ans.text("Correct! Any outfit you like is best :)")
                $('#submit').remove()
                let nextQ =  $('<a href="/quiz/'+next+'" class="btn text-font btn-primary mx-1">')
                nextQ.text('View Results')
                $('.quiz-buttons').append(nextQ)
                save_answers(submission,1)
            }
            $(".block-border").addClass('correct-border')
            $('img').off('click');
            $('#quiz-feedback').append(ans)
           
        })

        
    }
    if(next==7){
        let questions = data.answer
        let overall = questions['question1']['overall'] + questions['question2']['overall']  + questions['question3']['overall']  +questions['question4']['overall']  + questions['question5']['overall'] 
        $('#overall').text("You scored "+ overall+"/5")
    }

   

 })