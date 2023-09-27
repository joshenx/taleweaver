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
        return text_response
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
        {"title": "The Enchanted Forest", "moral": "Curiosity", "genre": "Fantasy", "vocabulary_age": "3", "total_pages": "2", "story": [{"page": 1, "text": "Once upon a time, in a land far away, there was a magical forest. The trees were tall and vibrant, and the flowers bloomed in every color of the rainbow. In this forest, there lived a little fairy named Lily. Lily had sparkling wings and a mischievous smile.", "image_prompt": "Lily the fairy flying among colorful flowers", "subject_description": "Lily: A small fairy with golden hair and shimmering wings", "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-PuMGCWJ1M3tJ6ExWwgZAlVT4/user-TETd6CWnI82tNSrj9rzXTm2Z/img-6PvYN4V00pcxFEuggN0cwgCp.png?st=2023-09-27T14%3A09%3A36Z&se=2023-09-27T16%3A09%3A36Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-26T23%3A35%3A53Z&ske=2023-09-27T23%3A35%3A53Z&sks=b&skv=2021-08-06&sig=9JtvIbxe3otlLCwi3N%2BhBNeLEPUpfFz6WUXXaf%2Bf8/8%3D"}, {"page": 2, "text": "Every day, Lily would explore the enchanted forest, discovering new creatures and hidden treasures. One day, as she was flying near a sparkling waterfall, she noticed a tiny unicorn named Sparkle. Sparkle had a magical horn and a coat that shimmered in the sunlight.", "image_prompt": "Lily and Sparkle the unicorn playing near a sparkling waterfall", "subject_description": "Lily: A small fairy with golden hair and shimmering wings, Sparkle: A tiny unicorn with a magical horn and a shimmering coat", "image_url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-PuMGCWJ1M3tJ6ExWwgZAlVT4/user-TETd6CWnI82tNSrj9rzXTm2Z/img-OVBG0lPeikyrd4v8YgjKezki.png?st=2023-09-27T14%3A09%3A42Z&se=2023-09-27T16%3A09%3A42Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-09-26T23%3A40%3A04Z&ske=2023-09-27T23%3A40%3A04Z&sks=b&skv=2021-08-06&sig=f/X8nYoJJMqumo9Ob3V6aLlr70uFOwL3XdeUnDt9nB0%3D"}]})

def generate_random_story():
    system_prompt = "Generate a random brief description of a story suitable for children in 15 words."
    assistant_example = "A child adventure in the forest."
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
                    "role": "assistant", 
                    "content": assistant_example
                },
            ],
        )
        print(response)

    except Exception as e:
        print("Error in generating random story from openAI:", str(e))
        return 503
    return response["choices"][0]["message"]["content"]