import openai
import os
from dotenv import load_dotenv

load_dotenv()  # Loads environment variables from .env file

openai.api_key = os.environ.get("VITE_OPENAPI_KEY")

# call openAI api
def generate_response(prompt):
    try:
        prompt = prompt
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            n=1,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            messages=[
                {"role": "system", "content": "You are an expert creative marketer. Create a campaign for the brand the user enters."},
                {"role": "user", "content": prompt},
            ],
        )
    except Exception as e:
        print("Error in creating campaigns from openAI:", str(e))
        return 503
    return response["choices"][0]["message"]["content"]

def generate_response_debugger(prompt):
    return "ok called openai api with prompt: " + prompt