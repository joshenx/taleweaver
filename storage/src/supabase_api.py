from supabase import Client
import json
import requests

def get_users(db: Client):
    users = db.table('users').select('userid').execute().model_dump_json()
    users = json.loads(users)
    return users['data']

def get_stories_by_user(db: Client, user_id: int):
    stories = db.table('stories').select('*').eq('userid', user_id).execute().model_dump_json()
    stories = json.loads(stories)
    return stories['data']

def get_story_by_id(db: Client, story_id: int):
    story_info = db.table('stories').select('age', 'focus', 'title').eq('storyid', story_id).execute().model_dump_json()
    story_info = json.loads(story_info)['data'][0]

    pages = db.table('pages').select('*').eq('storyid', story_id).execute().model_dump_json()
    pages = json.loads(pages)['data']
    story = {
        "title": story_info['title'],
        "focus": story_info['focus'],
        "vocabulary_age": story_info['age'],
        "total_pages": len(pages),
        "story": []
    }

    pages.sort(key=lambda x: x['pagenumber'])
    for page in pages:
        contents = db.table('contents').select('pagetext', 'imageprompt', 'subjdesc', 'imageurl').eq('pageid', page['pageid']).execute().model_dump_json()
        contents = json.loads(contents)['data'][0]
        story['story'].append({
            "page": page['pagenumber'],
            "text": contents['pagetext'],
            "image_prompt": contents['imageprompt'],
            "subject_description": contents['subjdesc'],
            "image_url": contents['imageurl']
        })
    return json.dumps(story)

def save_users_story(db: Client, user_id: int, story: dict):
    story_id = save_story_info(db, user_id, story['title'])
    save_story_pages(db, story_id, story['story'])
    return story_id

def save_story_info(db: Client, user_id: int, title: str):
    story_info = {
        "userid": user_id,
        "title": title,
    }
    response = db.table('stories').insert(story_info).execute().model_dump_json()
    story_id = json.loads(response)['data'][0]['storyid']
    return story_id

def save_story_pages(db: Client, story_id: int, pages: list):
    for page in pages:
        page_info = {
            "storyid": story_id,
            "pagenumber": page['page']
        }
        response = db.table('pages').insert(page_info).execute().model_dump_json()
        page_id = json.loads(response)['data'][0]['pageid']

        image_url = save_image(db, story_id, page['page'], page['image_url'])

        save_page_contents(db, page_id, page['text'], page['image_prompt'], page['subject_description'], image_url)

def save_image(db: Client, story_id: int, page_number: int, image_url: str):
    data = requests.get(image_url)
    image = data.content
    path = f'{story_id}/{page_number}.png'
    db.storage.get_bucket('images').upload(path, image)
    return db.storage.get_bucket('images').get_public_url(path)

def save_page_contents(db: Client, page_id: int, text: str, image_prompt: str, subject_description: str, image_url: str):
    content_info = {
        "pageid": page_id,
        "pagetext": text,
        "imageprompt": image_prompt,
        "subjdesc": subject_description,
        "imageurl": image_url
    }
    db.table('contents').insert(content_info).execute()