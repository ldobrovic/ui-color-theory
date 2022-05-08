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
            if(next==5){
                img.addClass("height-auto")
            } else {
                img.addClass("height-150")

            }
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

    head = $(' <div class=" col-md-12 parent">')
    head.append(' <div class="head">')

    clothes.append(head)
    clothes.append(top)
    clothes.append(bottom)
    // top.text('Drop your top here!')
  
    head.droppable({
        drop: function(event, ui){

            let drag = ui.draggable
            $('#color-grid').empty()
            outfit_grid(data.images)
            drag.removeAttr("style");
            head.text('')
            
            head.append(drag).attr("class", "hatt")
            if(!submission.includes(drag.attr('alt'))){
                submission[0]=drag.attr('alt');
            } 
        },
        accept: '.hat'
    })
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
                submission[1]=drag.attr('alt');
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
                submission[2]=drag.attr('alt');
            } 
        },
        accept: '.bottom'
    })
    let accessory = $('<div class="col-md-5  bag text-font accessory-spacing" id="accessory">')
    if(next==4){
        let bag = $('<img src="/static/images/q3bag.png" width="100px"/>')

        accessory.append(bag)
    
    }
   

    // accessory.text('')
    
    accessory.droppable({
        drop: function(event, ui){
            let drag = ui.draggable
            $('#color-grid').empty()
            outfit_grid(data.images)
            drag.removeAttr("style");
            accessory.text("")

            accessory.append(drag)
            if(!submission.includes(drag.attr('alt'))){
                submission[0]=drag.attr('alt');
            } 
        },
        accept: '.accesory'
    })

    
    
    $('#drop-grid').append(accessory)
    $('#drop-grid').append(clothes)
    // $('#drop-grid').append(clothes).attr("class", "disinlineblck")
  

 }

 function checkOutfit(wrong_colors,next){
    let count=0
  //console.log(submission)
    if(next==4){
        for(let i = 0;i<wrong_colors.length; ++i){
            if(submission.includes(wrong_colors[i])){
                count++;
                //console.log(count)
                 }
             }
         
           return count
    }  else {
        
        let pair1 = wrong_colors[0] //["red","orange",]
        let pair2 = wrong_colors[1] //["navy", "purple"]
        let pair3 = wrong_colors[2] // ["red", "purple"]

    //   console.log(submission)
        if(submission.includes(pair1[0])&&submission.includes(pair1[1])){
            // console.log("pair1")  
            return 1

        }

        else if(submission.includes(pair2[0])&&submission.includes(pair2[1])){
        //    console.log("pair2")  
           
            return 1
        }
        if(submission.includes(pair3[0])&&submission.includes(pair3[1])){
            // console.log("pair3")  
          
            return 1
        }
    }
    return 3

}

function showCorrectOutfit(next) {

   if (next == 4) {
       img_src = '/static/images/q3solution.png'
       feedback = "An example outfit solution is found to the right. The bright, eye-catching 'parakeet green' sweater is balanced out by the more subdued neutrals of the black pants and beige tote bag."
   } else {
       img_src = '/static/images/q4solution.png'
       feedback = "An example outfit solution is found to the right. This outfit features the analogous color pairing of the red hat and purple sweater, grounded by the neutral navy pants. In fact, red-purple-navy form an analogous color triple!"
   }

   let two = $("<div class='row'><div class='col-3'></div><div class='col-3 font-weight-bold feedback_pad'><p>" + feedback + "</p></div><div class='col-1'><img src=" +img_src+ " class='correct_outfit' alt='example solution for this question'></img></div><div class='col-5'></div></div>")
    // let two = $("<div class='row'><div class='col-3'>" + feedback + "</div><div class='col'><img src=" +img_src+ " class='correct_outfit' alt='example solution for this question'>")

   $('#quiz-feedback').append(two)



   console.log(next);


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
    console.log("saving answer--->", item)
    $.ajax({
        type: "POST",
        url: "save_answers",
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(item),
        success: function(result){
            console.log('answers saved')
            console.log(result["user_answers"])
        },
        error: function(request,status, error){
            console.log("Error")
            console.log(request)
            console.log(status)
            console.log(error)
        }

    })
 }
 
/*****************DOCUMENT READY*************************88*/ 
 $(document).ready(function(){
     if(next==2){
         $('#icon1').addClass('current')

     } else if(next==3){
        $('#icon2').addClass('current')
     }else if(next==4){
        $('#icon3').addClass('current')

     }else if(next==5){
        $('#icon4').addClass('current')

     }else if(next==6){
        $('#icon5').addClass('current')

     } else if(next==7){
        $('.fa-stack').addClass('current')



     }
     
    if(next==2){
        color_grid(data.images)
        $('#submit').click(function(e){
            let correct = showCorrectGrid()
            let ans = $('<div class="col-12 text-font text-color feedback">')
            if(checkColorAnswers()){
                ans.text('Good Job! You found all of the neutrals.')
                save_answers(submission,1)
            } else if(correct>0){
                let diff = submission.length-correct
                ans.text('Nice Try! You got '+correct+' correct and '+diff+' wrong. There are 4 neutrals displayed in total: black, grey, beige, and navy.')
                save_answers(submission,0)
            } else {
                ans.text('You got '+correct+' correct. Try reviewing the principles of color theory! There are 4 neutrals displayed in total: black, grey, beige, and navy.')
                save_answers(submission,0)

            }
           $('#color-grid').append(ans)
           $('#submit').remove()
           let nextQ =  $('<a href="/quiz/'+next+'" class="btn text-font  teach_button btn-primary mx-1">')
           nextQ.text('Next Question')
          

           $('.quiz-buttons').append(nextQ)
         
          
        })

    } else if(next==3){
        color_grid(data.images)
        $('#submit').click(function(e){
            
            let ans = $('#feedback')
            let isCorrect = checkColorAnswers()

            if(isCorrect){
                ans.removeClass('col-8').addClass('col-12').addClass('text-center')
                ans.text('Good Job! Check out other analogous combinations on the colorwheel below!')
                $('#popup-content').addClass("active").addClass('ml-4').addClass('center')
                save_answers(submission,1)
            } else if(submission.length<1) {
                ans.text('Please select some colors!')
                 $('#color-grid').append(ans)
                return
            }
            else {
                ans.removeClass('col-8').addClass('col-12').addClass('text-center')
                ans.text('Try reviewing the colorwheel below! Possible pairings are found next to each other on the color wheel, such as blue and purple, red and orange, or yellow and green.')
                $('#popup-content').addClass("active").addClass('ml-4').addClass('center')
                ans.addClass('text-left').addClass('mr-4')
                submitted=true
                save_answers(submission,0)
            }
            
            highlightResults(isCorrect)
           $('#submit').remove()
           let nextQ =  $('<a href="/quiz/'+next+'" class="btn text-font  teach_button btn-primary mx-1">')
           nextQ.text('Next Question')
          
           $('.quiz-buttons').append(nextQ)
        })


    } 
    else if(next==4||next==5){
        outfit_grid(data.images)
        makeOutfit()
        $('#submit').click(function(e){
            $('.feedback').remove()
              let ans = $('<div class="col-12 text-font text-color feedback bottom_marg">')
            isCorrect = true
            if (submission.length<2){
                ans.text('Please make your outfit!')
                $('#quiz-feedback').append(ans)
            } else {
                let colors = checkOutfit(data.answer,next)
             //console.log(colors)
                if(colors==0){
                    ans.text("Good Job! Don't be afraid to use color next time!")
                   save_answers(submission,1)
                   
                } else if (colors<2){
                    ans.text('Good Job!')
                    save_answers(submission,1)
    
                } else {
                    ans.text("Not quite!");
                    isCorrect = false;
                    save_answers(submission,0)

                }
                
                $('#quiz-feedback').append(ans)
               if (!isCorrect) {
                showCorrectOutfit(next, ans);
               }

               $('#submit').remove()
               let nextQ =  $('<a href="/quiz/'+next+'" class="btn text-font  teach_button btn-primary mx-1">')
               nextQ.text('Next Question')
               

               $('.quiz-buttons').append(nextQ)
             $('.draggable').draggable( "disable" ) //This is returning an error for some reason

            }
            
        })

    } else {
        img_grid(data.images)
        $('#submit').click(function(e){
            let ans = $('<div class="col-12 text-font text-color feedback">')
            if(submission.length==0){
                ans.text("Please choose an outfit")
            } else {
                $('.feedback').remove()
                $(".q5_highlight").addClass("q5_correct")
                ans.text("Correct! Any outfit you like is best :)")
                $('#submit').remove()
                let nextQ =  $('<a href="/quiz/'+next+'" class="btn text-font  teach_button btn-primary mx-1">')
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