from anthropic import (
    Anthropic,
    HUMAN_PROMPT,
    AI_PROMPT,
    APIStatusError,
    APIConnectionError,
    RateLimitError,
)
from typing import Union, Dict
import json
import os

# defaults to os.environ.get("ANTHROPIC_API_KEY")
anthropic_client = Anthropic(
    api_key=""
)


def get_anthropic_response(
    context: str, prompt: str
) -> Union[str, Dict[str, Union[str, int]]]:
    try:
        dir_path = os.path.dirname(os.path.realpath(__file__))

        # Build a relative path to the context.json file
        context_file_path = os.path.join(dir_path, "context.json")
        # Step 1: Read the JSON data from the file
        with open(context_file_path, "r", encoding="utf-8") as file:
            data = json.load(file)

        # Step 2: Get a JSON dump (string representation) of the JSON data
        json_dump = json.dumps(data, indent=4)
        completion = anthropic_client.completions.create(
            model="claude-2",
            max_tokens_to_sample=100000,
            prompt=f"{HUMAN_PROMPT} Context: {json_dump} \n Question: {prompt}{AI_PROMPT}",
        )
        return completion.completion

    except APIConnectionError as e:
        print(e)
        print(e.__cause__)
        return {
            "message": "There is an issue connecting to the Assistant. Please try again later!",
            "code": 500,
        }
    except RateLimitError as e:
        print(e.__cause__)
        return {
            "message": "I'm really busy now :( Please try again later!",
            "code": 429,
        }
    except APIStatusError as e:
        print("Non 2XX status code received")
        print(e.status_code)
        print(e.response)
        return {"code": e.status_code, "message": e.message}
