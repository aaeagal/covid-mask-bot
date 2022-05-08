// citation: https://blog.shahednasser.com/simple-twitter-bot-tutorial-with-node-js/
// thanks to shahednasser for the tutorial!
require('dotenv').config()
const {TwitterClient} = require('twitter-api-client')
const axios = require('axios')

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

axios.get('https://api.covidactnow.org/v2/cbsa/39580.json?apiKey=b962634490e543ee9e8c4d8e4e3c5aa6')
    .then(response => {
    let tweet
        // the CDC recommends that if 200 or more people out of 100,000 people in your area are infected, it's probably a good call to wear a maske
        // there's about 1,500,000 people in 27606, so I figured that if 2500 people are infected, it's probably a good call to wear a mask.
        if (response.data.actuals.newCases < 2500) {
            tweet = `📊 ${response.data.actuals.newCases } new COVID-19 cases in 27606. You don't need to wear a mask!`
        } else {
            tweet = `📊 ${response.data.actuals.newCases} new COVID-19 cases in 27606. Wear a mask! Tell a friend :)`    
        }
    

    console.log(tweet)
    
    twitterClient.tweets.statusesUpdate({
        status: tweet
    }).then (response => {
        console.log("Tweeted!", response)
    }).catch(err => {
        console.error(err)
    }) 
}).catch (err => {
    console.error(err)
})

