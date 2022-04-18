 let submission = []

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
 function checkAnswers(){
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

 $(document).ready(function(){

    color_grid(data.images)
    console.log(data.answer)

    $('#submit').click(function(e){
       

        let correct = showCorrectGrid()
        let ans = $('<div class="col-12 feedback">')
        if(checkAnswers()){
            ans.text('Good Job! You got all correct.')
        } else {
            ans.text('Nice Try! You got '+correct+' correct. Right answers are in green!')
        }
       $('#color-grid').append(ans)
       $('#submit').remove()
       let nextQ =  $('<a href="/quiz/'+next+'" class="btn btn-primary mx-1">')
       nextQ.text('Next Question')
       $('.quiz-buttons').append(nextQ)
    })

 })