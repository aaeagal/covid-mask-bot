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
        // based on: https://www.cdc.gov/coronavirus/2019-ncov/science/community-levels.html
        
        if (response.data.actuals.newCases >= 139079) {
            tweet = `📊 ${response.data.actuals.newCases } new COVID-19 cases in 27606. There's high community risk! For the love of god, wear a mask! TELL EVERYONE TO WEAR A MASK!`
        } else if (response.data.actuals.newCases > 2500) {
            tweet = `📊 ${response.data.actuals.newCases} new COVID-19 cases in 27606. There's medium community risk! Wear a mask on campus if you're in a large lecture hall! Tell a friend :)`    
        }
        else {
            tweet = `📊 ${response.data.actuals.newCases} new COVID-19 cases in 27606. The community risk is low! No Mask needed! Yay! :)`
        }
    
    //console.log(response)
    console.log(tweet)
 
/*
    twitterClient.tweets.statusesUpdate({
        status: tweet
    }).then (response => {
        console.log("Tweeted!", response)
    }).catch(err => {
        console.error(err)
    }) */
}).catch (err => {
    console.error(err)
})

