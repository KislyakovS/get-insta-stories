const { getUserByUsername, getStories } = require('instagram-stories');
require('dotenv').config()

const { USER_ID: userId, SESSION_ID: sessionid } = process.env;

class Instagram {
    static async getStoriesByUsername(username) {
        const { user } = await getUserByUsername({ username, userId, sessionid });
        const { items: stories } = await getStories({ id: user.id, userId, sessionid });


        return stories.map(story => {
            if (story.video_versions) {
                return {
                    type: 'video',
                    url: story.video_versions[0].url
                }
            } else if (story.image_versions2) {
                return {
                    type: 'image',
                    url: story.image_versions2.candidates[0].url
                }
            }
        })
    }
}

module.exports = Instagram;