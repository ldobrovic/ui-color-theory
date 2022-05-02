from dataclasses import dataclass
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)
import sys

user_answers = {
    "question1":{
        'overall': 0, #0 indicates wrong, 1 indicates correct
        'answers': [],
    },
     "question2":{
        'overall': 0,
        'answers': [],
    },
     "question3":{
        'overall': 0,
        'answers': [],
    },
     "question4":{
        'overall': 0,
        'answers': [],
    },
     "question5":{
        'overall': 0,
        'answers': [],
    },

}

lessons = [
    {
        "id": "0",
        "text": "Advance through the lessons to learn the principles of color theory for fashion. On each page, hover over the images to learn more.",
    },
    {
        "id": "1",
        "text": "The neutral colors are black, white, grey, navy, beige, brown, and olive green. Neutrals make life easy and all go well together.",
        "examples": [
            {
                "description": "British designer Phoebe Philo combines the neutrals beige, black, and white into a simple yet put-together look.",
                "image": "/static/images/p1phoebe.png",
            },
            {
                "description": "Although sometimes seen as a faux-pas, black and navy here create a serious, composed outfit.",
                "image": "/static/images/p1navy.png",
            },
            {
                "description": "A seminal figure in the crossover between music and haute couture, Kanye here goes for rich browns, blacks, and olive greens.",
                "image": "/static/images/p1kanye.png",
            },

        ],
    },
    {
        "id": "2",
        "text": "A great wardrobe can be composed entirely of neutrals",
        "examples": [
            {
                "description": "A sample men's wardrobe, primarily consisting of black and navy.",
                "image": "/static/images/p2men.png",
            },
            {
                "description": "A sample women's wardrobe, with more beiges and whites.",
                "image": "/static/images/p2women.png",
            },
        ],
    },
    {
        "id": "3",
        "text": "On a color wheel, colors next to each other are called analogous colors. Analogous colors go very well together.",
        "examples": [
            {
                "description": "Color wheel",
                "image": "/static/images/p3wheel.png",
            },
            {
                "description": "Jennifer Lopez in a Versace gown at the 2000 Grammy Awards. The analagous green-torquoise color pairing pops.",
                "image": "/static/images/p3jlo.png",
            },
            {
                "description": "British designer Alexa Chung in a split-tone red-and-pink dress.",
                "image": "/static/images/p3alexa.png",
            }
        ],
    },
    {
        "id": "4",
        "text": "When in doubt, pick a few neutral colors and a hint of a bright non-neutral.",
        "examples": [
            {
                "description": "This outfit consits mostly of the neutrals beige and white, but adds a pop of pink footwear.",
                "image": "/static/images/p4heels.png",
            },
            {
                "description": "The neutrals navy and white create a balanced look on top of bright, eye-catching red loafers.",
                "image": "/static/images/p4red.png",
            },
            {
                "description": "Ryan Gosling adds a touch of flair to the traditional navy suit and black shoes with an orange-yellow knit shirt.",
                "image": "/static/images/p4yellow.jpeg",
            }
        ],
    },
    {
        "id": "5",
        "text": "Never be afraid of color.",
        "examples": [
            {
                "description": "Rapper A$AP Rocky sports a daring pink Loewe tuxedo with a classic white shirt and sneakers at the 2019 pre-Grammys gala.",
                "image": "/static/images/p5rocky.png",
            },
            {
                "description": "Kanye performs in an all-red suit-and-sneaker combo at the 2010 VMAs.",
                "image": "/static/images/p5kanye.png",
            },
            {
                "description": "Zendaya wears a red-yellow-orange (analogous colors!) all-over-print Dolce & Gabbana ballgown at the 2017 Met Gala.",
                "image": "/static/images/p5zendaya.png",
            }
        ],
    },
]

questions = [
    {
        "id": "0",
        "text": "Put your knowledge to test!",
        "images": [],
    },
    {
        "id": "1",
        "text": "Identify the neutrals",
        "images": [
            "black",
            "#ff00ff",
            "lightgrey",
            "#ff9900",
            "#e1c699", #beige
            "#01ffff",
            "#9900ff",
            "#1c4587", #navy
        ],
        "answer": [
            "black",
            "lightgrey",
            "#e1c699",
            "#1c4587"
        ]
    },
    {
        "id": "2",
        "text": "Identify at least one analogous color pair",
        "images": [
            "#00ba00",
            "#ff0000",
            "black",
            "#ffa100",
            "#00b6d8",
            "#fffa00",
            "#0025c2",
            "#980ec2", #navy
        ],
         "answer":[
            ["#00ba00","#00b6d8"],
            ["#0025c2", "#980ec2"],
        ],
    },
    {
        "id": "3",
        "text": "Build an outfit with mainly neutrals and at most one color",
        "images": [
           
            {
                "description": "white",
                "image": "/static/images/q4beige.png",
                "type": "accesory"
            },
             {
                "description": "green",
                "image": "/static/images/q3green.png",
                "type": "top"
            },
           
            {
                "description": "beige",
                "image": "/static/images/q3beige.png",
                "type": "top"
            },
             {
                "description": "red",
                "image": "/static/images/q3red.png",
                "type": "accesory"
            },
             {
                "description": "purple",
                "image": "/static/images/q3purple.png",
                "type": "bottom"
            },
           
            {
                "description": "black",
                "image": "/static/images/q3black.png",
                "type": "bottom"
            },
        ],
        "answer": [
            # these are the wrong colors
            "red",
            "purple",
            "green"
        ]
    },
    {
        "id": "4",
        "text": "Build an outfit with one neutral and an analogous color pair",
        "answer":[
            ["red","orange"],
            ["navy", "purple"],
            ["red", "purple"]
        ],
        "images": [
            {
                "description": "red",
                "image": "/static/images/q4red.png",
                 "type": "hat"
            },
          
           
            {
                "description": "orange",
                "image": "/static/images/q4orange.png",
                "type": "top"
            },
            {
                "description": "purple",
                "image": "/static/images/q4purple.png",
                "type": "top"
            },
              {
                "description": "beige",
                "image": "/static/images/q3white.png",
                "type": "hat"
            },
            {
                "description": "navy",
                "image": "/static/images/q4navy.png",
                "type": "bottom"
            },
             {
                "description": "black",
                "image": "/static/images/q4black.png",
                "type": "bottom"
            },
        ],
    },
    {
        "id": "5",
        "text": "Choose the outfit that you think uses color the best",
        "images": [
                        {
                "description": "black",
                "image": "/static/images/q5black.webp",
            },
            {
                "description": "yellow",
                "image": "/static/images/q5yellow.jpeg",
            },
            {
                "description": "white",
                "image": "/static/images/q5white.jpeg",
            },
            {
                "description": "pink",
                "image": "/static/images/q5pink.png",
            },
        ],
    },
    {
        "id": "6",
        "text": "Well done!",
        "images": [],
        "answer" : user_answers
    },
]


# ROUTES

@app.route('/')
def render_welcome():
   return render_template('welcome.html')

@app.route('/learn/<id>')
def render_learn(id):
    global lessons

    this_lesson = [x for x in lessons if x["id"] == id]

    if len(this_lesson) == 0:
        this_lesson.append(lessons[0])
   
    return render_template("learn.html", data = this_lesson[0],next = int(this_lesson[0]["id"]) + 1,  before = int(this_lesson[0]["id"])-1)


@app.route('/quiz/<id>')
def render_quiz(id):
    global questions

    this_question = [x for x in questions if x["id"] == id]

    if len(this_question) == 0:
        this_question.append(questions[0])

    return render_template("quiz.html", data = this_question[0], next = int(this_question[0]["id"]) + 1)

@app.route('/quiz/save_answers', methods=['POST'])
def save_answers():
    global user_answers 

    json_data = request.get_json()   
    id = json_data["id"] 
    overall = json_data["overall"] 
    answers = json_data["answers"]
   
    answer = {
       "overall": overall,
       "answers": answers,
    }
    user_answers[id] = answer

    return jsonify(user_answers=user_answers)

if __name__ == '__main__':
   app.run(debug = True)




