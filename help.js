const ig = require('instagram-stories');
require('dotenv').config()

const { USER_ID: userId, SESSION_ID: sessionid } = process.env;

exports.getStories = (id) => ig.getStories({ id, userId, sessionid });
exports.getStoriesFeed = (id) => ig.getStoriesFeed({ id, userId, sessionid });
exports.getMediaByCode = (code) => ig.getMediaByCode({ code, userId, sessionid });
exports.getUserByUsername = (username) => ig.getUserByUsername({ username, userId, sessionid });
exports.getMediaByLocation = (id) => ig.getMediaByLocation({ id, userId, sessionid });
