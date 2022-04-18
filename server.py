from dataclasses import dataclass
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)
import sys

user_answers = {
    "question1":{
        'overall': 0,
        'answers': [],
    },
}

lessons = [
    {
        "id": "0",
        "text": "Advance through the slides, hover over the images to learn more",
    },
    {
        "id": "1",
        "text": "Neutral colors like black, white, and grey make life easy!",
        "examples": [
            {
                "description": "YSL Le Smoking",
                "image": "/static/images/p1ysl.jpg",
            },
            {
                "description": "That dress",
                "image": "/static/images/p1dress.jpg",
            },
            {
                "description": "Matila Djerf",
                "image": "/static/images/p1matilda.png",
            }
        ]
    },
    {
        "id": "2",
        "text": "The neutrals also include navy, beige, brown, and olive green",
        "examples": [
            {
                "description": "Phoebe Philo",
                "image": "/static/images/p2phoebe.png",
            },
            {
                "description": "Kanye",
                "image": "/static/images/p2kanye.png",
            },
            {
                "description": "Navy",
                "image": "/static/images/p2navy.png",
            }
        ]
    },
    {
        "id": "3",
        "text": "A great wardrobe can be composed entirely of neutrals",
        "examples": [
            {
                "description": "sample men's",
                "image": "/static/images/p3men.png",
            },
            {
                "description": "sample women's",
                "image": "/static/images/p3women.png",
            },
        ]
    },
    {
        "id": "4",
        "text": "On a color wheel, colors next to each other (analogous colors) go well together!",
        "examples": [
            {
                "description": "Color wheel",
                "image": "/static/images/p4wheel.png",
            },
            {
                "description": "JLo",
                "image": "/static/images/p4jlo.png",
            },
            {
                "description": "Alexa Chung",
                "image": "/static/images/p4alexa.png",
            }
        ]
    },
    {
        "id": "5",
        "text": "When in doubt, pick a few neutrals and a hint of color!",
        "examples": [
            {
                "description": "Heels",
                "image": "/static/images/p5heels.png",
            },
            {
                "description": "Red",
                "image": "/static/images/p5red.png",
            },
            {
                "description": "Yellow",
                "image": "/static/images/p5yellow.jpeg",
            }
        ]
    },
    {
        "id": "6",
        "text": "Never be afraid of color",
        "examples": [
            {
                "description": "Pink suit",
                "image": "/static/images/p6rocky.png",
            },
            {
                "description": "All red",
                "image": "/static/images/p6kanye.png",
            },
            {
                "description": "Zendaya",
                "image": "/static/images/p6zendaya.png",
            }
        ]
    },
]

questions = [
    {
        "id": "0",
        "text": "Answer each question",
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
        "text": "Identify the analogous color pairs",
        "images": [],
    },
    {
        "id": "3",
        "text": "Build an outfit with mainly neutrals and at most one color",
        "images": [
            {
                "description": "red",
                "image": "/static/images/q3red.png",
            },
            {
                "description": "green",
                "image": "/static/images/q3green.png",
            },
            {
                "description": "black",
                "image": "/static/images/q3black.png",
            },
            {
                "description": "white",
                "image": "/static/images/q3white.png",
            },
            {
                "description": "purple",
                "image": "/static/images/q3purple.png",
            },
            {
                "description": "beige",
                "image": "/static/images/q3beige.png",
            },
        ],
    },
    {
        "id": "4",
        "text": "Build an outfit with one neutral and an analogous color pair",
        "images": [
            {
                "description": "red",
                "image": "/static/images/q4red.png",
            },
            {
                "description": "beige",
                "image": "/static/images/q4beige.png",
            },
            {
                "description": "black",
                "image": "/static/images/q4black.png",
            },
            {
                "description": "orange",
                "image": "/static/images/q4orange.png",
            },
            {
                "description": "purple",
                "image": "/static/images/q4purple.png",
            },
            {
                "description": "navy",
                "image": "/static/images/q4navy.png",
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
                "image": "/static/images/q5white.png",
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

    return render_template("learn.html", data = this_lesson[0], next = int(this_lesson[0]["id"]) + 1)


@app.route('/quiz/<id>')
def render_quiz(id):
    global questions

    this_question = [x for x in questions if x["id"] == id]

    if len(this_question) == 0:
        this_question.append(questions[0])

    return render_template("quiz.html", data = this_question[0], next = int(this_question[0]["id"]) + 1)

if __name__ == '__main__':
   app.run(debug = True)




