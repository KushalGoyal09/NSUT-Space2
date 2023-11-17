require('dotenv').config();

const OpenAI = require('openai');
const openai = new OpenAI();

async function generatePost(req,res) {
    const {topic} = req.body;
    const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: `write a post to post on a college social media about the topic ${topic}` }],
        model: "gpt-3.5-turbo",
    });
    res.json({success:true, content: completion.choices[0].message.content});
}

module.exports = generatePost;