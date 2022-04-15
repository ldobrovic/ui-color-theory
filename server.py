from dataclasses import dataclass
from socketserver import ThreadingUnixStreamServer
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
app = Flask(__name__)
import sys


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
                "image": "/static/p1ysl.jpg",
            },
            {
                "description": "That dress",
                "image": "/static/p1dress.jpg",
            },
            {
                "description": "Matila Djerf",
                "image": "/static/p1matilda.png",
            }
        ]
    },
    {
        "id": "2",
        "text": "The neutrals also include navy, beige, brown, and olive green",
        "examples": [
            {
                "description": "Phoebe Philo",
                "image": "/static/p2phoebe.png",
            },
            {
                "description": "Kanye",
                "image": "/static/p2kanye.png",
            },
            {
                "description": "Navy",
                "image": "/static/p2navy.png",
            }
        ]
    },
    {
        "id": "3",
        "text": "A great wardrobe can be composed entirely of neutrals",
        "examples": [
            {
                "description": "sample men's",
                "image": "/static/p3men.png",
            },
            {
                "description": "sample women's",
                "image": "/static/p3women.png",
            },
        ]
    },
    {
        "id": "4",
        "text": "On a color wheel, colors next to each other (analogous colors) go well together!",
        "examples": [
            {
                "description": "Color wheel",
                "image": "/static/p4wheel.png",
            },
            {
                "description": "JLo",
                "image": "/static/p4jlo.png",
            },
            {
                "description": "Alexa Chung",
                "image": "/static/p4alexa.png",
            }
        ]
    },
    {
        "id": "5",
        "text": "When in doubt, pick a few neutrals and a hint of color!",
        "examples": [
            {
                "description": "Heels",
                "image": "/static/p5heels.png",
            },
            {
                "description": "Red",
                "image": "/static/p5red.png",
            },
            {
                "description": "Yellow",
                "image": "/static/p5yellow.jpeg",
            }
        ]
    },
    {
        "id": "6",
        "text": "Never be afraid of color",
        "examples": [
            {
                "description": "Pink suit",
                "image": "/static/p6rocky.png",
            },
            {
                "description": "All red",
                "image": "/static/p6kanye.png",
            },
            {
                "description": "Zendaya",
                "image": "/static/p6zendaya.png",
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
        "images": [],
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
                "image": "/static/q3red.png",
            },
            {
                "description": "green",
                "image": "/static/q3green.png",
            },
            {
                "description": "black",
                "image": "/static/q3black.png",
            },
            {
                "description": "white",
                "image": "/static/q3white.png",
            },
            {
                "description": "purple",
                "image": "/static/q3purple.png",
            },
            {
                "description": "beige",
                "image": "/static/q3beige.png",
            },
        ],
    },
    {
        "id": "4",
        "text": "Build an outfit with one neutral and an analogous color pair",
        "images": [
            {
                "description": "red",
                "image": "/static/q4red.png",
            },
            {
                "description": "beige",
                "image": "/static/q4beige.png",
            },
            {
                "description": "black",
                "image": "/static/q4black.png",
            },
            {
                "description": "orange",
                "image": "/static/q4orange.png",
            },
            {
                "description": "purple",
                "image": "/static/q4purple.png",
            },
            {
                "description": "navy",
                "image": "/static/q4navy.png",
            },
        ],
    },
    {
        "id": "5",
        "text": "Choose the outfit that you think uses color the best",
        "images": [
                        {
                "description": "black",
                "image": "/static/q5black.webp",
            },
            {
                "description": "yellow",
                "image": "/static/q5yellow.jpeg",
            },
            {
                "description": "white",
                "image": "/static/q5white.png",
            },
            {
                "description": "pink",
                "image": "/static/q5pink.png",
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




