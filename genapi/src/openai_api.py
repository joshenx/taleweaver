import openai
import os
from dotenv import load_dotenv
import json

load_dotenv()  # Loads environment variables from .env file

openai.api_key = os.environ.get("VITE_OPENAPI_KEY")

# call openAI api
def generate_response(system_prompt, user_prompt):
    print(system_prompt)
    print(user_prompt)
    text_response = generate_story(system_prompt, user_prompt)
    if ("Violation Detected" in text_response):
        return generate_response_debugger("prompt")
    text_json = json.loads(text_response)
    pages = text_json["story"]
    for page in pages:
        image_prompt = f'Storybook illustration of {page["subject_description"]}, {page["image_prompt"]}, digital art'
        image_response = generate_image(image_prompt)
        page["image_url"] = image_response
    return json.dumps(text_json)

def generate_story(system_prompt, user_prompt):
    try:
        response = openai.ChatCompletion.create(
            model = "gpt-3.5-turbo",
            # n=1, => higher = generate multiple messages choices
            # top_p=1, => see docs... idrk what this is
            # frequency_penalty=0,
            # presence_penalty=0,
            temperature = 0.7,
            messages = [
                {
                    "role": "system", 
                    "content": system_prompt
                },
                {
                    "role": "user", 
                    "content": user_prompt
                },
                {
                    "role": "assistant", 
                    "content": str(generate_story_debugger("prompt"))
                },
            ],
        )

        print(response)
    except Exception as e:
        print("Error in creating story from openAI:", str(e))
        return 503
    return response["choices"][0]["message"]["content"]

def generate_image(prompt):
    try:
        response = openai.Image.create(
            prompt = prompt,
            n = 1, # number of images to generate 
            size = "256x256", # size of each generated image
        )
    except Exception as e:
        print("Error in creating image from openAI:", str(e))
        return 503
    return response["data"][0]["url"]

# ========== FOR TESTING PURPOSES ==========

def generate_response_debugger(prompt):
    text_response = generate_story_debugger(prompt)
    text_json = json.loads(text_response)
    pages = text_json["story"]
    # i = 1
    for page in pages:
        # if i == 1:
        #     url = generate_image(page["image_prompt"])
        #     page["image_url"] = url
        #     i += 1
        #     continue
        image_prompt = page["image_prompt"]
        image_response = generate_image_debugger(image_prompt)
        page["image_url"] = image_response
    return json.dumps(text_json)

def generate_image_debugger(prompt):
    return "https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350"

def generate_story_debugger(prompt):
    print("ok called openai api with prompt: " + prompt)
    return json.dumps(
        {"title": "The Cheesy Adventure",
         "moral": "Curiosity",
         "genre": "Educational",
         "vocabulary_age": "7",
         "total_pages": "2",
         "story": [{
             "page": 1,
             "text": "Once upon a time, there was a little mouse named Max. \
             Max loved cheese more than anything in the world. He would scurry \
            through the fields and forests, searching for the tastiest cheeses \
            to nibble on.",
            "image_prompt": "Max the mouse exploring a giant cheese maze",
            "subject_description": "Max: A small brown mouse with big round ears",
            "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/privat\
                e/org-PuMGCWJ1M3tJ6ExWwgZAlVT4/user-TETd6CWnI82tNSrj9rzXTm2Z/img-Zf\
                    gEU1o0N0pvs8vRyz3e11QQ.png?st=2023-09-23T09%3A44%3A09Z&se=2023-0\
                        9-23T11%3A44%3A09Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=\
                            image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&skt\
                                id=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-\
                                    22T22%3A45%3A33Z&ske=2023-09-23T22%3A45%3A33Z&sk\
                                        s=b&skv=2021-08-06&sig=33EYA25YTfdU%2BkxfrcD\
                                            A8xU1v8qNwCVmgtv9crchk2Q%3D"},
            {
             "page": 2,
             "text": "Then, there was a little mouse named Max. \
             Max loved cheese more than anything in the world. He would scurry \
            through the fields and forests, searching for the tastiest cheeses \
            to nibble on.",
            "image_prompt": "Max the mouse exploring a giant cheese maze",
            "subject_description": "Max: A small brown mouse with big round ears",
            "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/privat\
                e/org-PuMGCWJ1M3tJ6ExWwgZAlVT4/user-TETd6CWnI82tNSrj9rzXTm2Z/img-Zf\
                    gEU1o0N0pvs8vRyz3e11QQ.png?st=2023-09-23T09%3A44%3A09Z&se=2023-0\
                        9-23T11%3A44%3A09Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=\
                            image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&skt\
                                id=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-\
                                    22T22%3A45%3A33Z&ske=2023-09-23T22%3A45%3A33Z&sk\
                                        s=b&skv=2021-08-06&sig=33EYA25YTfdU%2BkxfrcD\
                                            A8xU1v8qNwCVmgtv9crchk2Q%3D"}]})