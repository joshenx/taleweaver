export const generateRandomStory = async () => {
  var story = 'a child and his/her adventure';
  try {
    const response = await fetch('http://127.0.0.1:8000/generate-random-story');

    if (!response.ok) {
      console.log('Network response was not ok');
    }
    const data = await response.json();
    story = data
  } catch (error) {
    console.error('Error fetching random story:', error);
  } finally {
    return story;
  }
};
