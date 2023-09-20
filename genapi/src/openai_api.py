import openai
import os
from dotenv import load_dotenv

load_dotenv()  # Loads environment variables from .env file

openai.api_key = os.environ.get("VITE_OPENAPI_KEY")

# call openAI api
def generate_response(prompt):
    text_response = generate_story(prompt)
    # TODO: for each image_prompt we call generate_image(image_prompt)
    # put into return format
    # "image_url": the actual image url
    # return everything

def generate_story(prompt):
    print(prompt)
    try:
        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            # n=1, => higher = generate multiple messages choices
            # top_p=1, => see docs... idrk what this is
            # frequency_penalty=0,
            # presence_penalty=0,
            temperature = 0.7,
            messages = [
                # {
                #     "role": "system", 
                #     "content": "You are an expert creative marketer. Create a campaign for the brand the user enters."
                # },
                {
                    "role": "user", 
                    "content": prompt
                },
            ],
        )
    except Exception as e:
        print("Error in creating campaigns from openAI:", str(e))
        return 503
    return response["choices"][0]["message"]["content"]

def generate_image(prompt):
    print(prompt)
    try:
        # TODO: change
        response = openai.Completion.create(
            model = "gpt-3.5-turbo", # change
            prompt=prompt, # ????
            temperature=0.7,
        )
    except Exception as e:
        print("Error in creating campaigns from openAI:", str(e))
        return 503
    return response["choices"][0]["message"]["content"] # check

def generate_response_debugger(prompt):
    print("ok called openai api with prompt: " + prompt)
    return {
      "title": "The Adventures of Lily and Max",
      "focus": "vocabulary",
      "vocabulary_age": "3",
      "story": [
        {
          "page": 1,
          "text": "Once upon a time, there was a girl named Lily and a boy named Max. They were best friends. Lily had a beautiful pink dress, and Max wore a cool blue hat.",
          "image_prompt": "An illustration of Lily wearing a pink dress and Max wearing a blue hat, holding hands and smiling"
        },
        {
          "page": 2,
          "text": "One sunny day, Lily and Max went to the park. They saw a big, yellow slide. 'Let's go down the slide,' said Max. 'Yes,' replied Lily with excitement.",
          "image_prompt": "An image of Lily and Max sliding down a bright yellow slide, laughing and having fun"
        },
        {
          "page": 3,
          "text": "At the park, they also found a friendly dog named Spot. Spot had black and white fur. 'Woof woof!' barked Spot. 'He wants to play with us,' said Lily. 'Let's throw the ball!' exclaimed Max.",
          "image_prompt": "An illustration of Lily, Max, and Spot playing with a red ball in the park, surrounded by green trees and colorful flowers"
        },
        {
          "page": 4,
          "text": "Lily and Max played with the ball until it was time to go home. They were tired but happy. 'Let's walk together,' suggested Lily. 'Hold my hand,' said Max.",
          "image_prompt": "A picture of Lily and Max walking hand in hand, with the sun setting behind them, casting a warm orange glow"
        },
        {
          "page": 5,
          "text": "Finally, they reached their houses. Lily gave Max a big hug. 'Goodnight, Max,' said Lily. 'Goodnight, Lily,' replied Max. They went to sleep, looking forward to more adventures tomorrow.",
          "image_prompt": "An image of Lily and Max hugging each other goodnight, with their houses in the background and a starry night sky"
        }
      ]
    }