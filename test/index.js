const {search } = require("../dist/kultunaut-node-lib/events.js")

const handle = (fun) => Promise.resolve(fun).then((e) => console.log(e.length));

handle(search({ lat: "55.676788", lon: "12.505840", radius: 2000, categories: ["Popup:Andet"], enddate:'14-03-2021'}))  // frb


//const excluded = ['14388752', '14396556', '14316105', '14397320', '14321961', '14396951', '14403178']
//handle(setCredentials())
//handle(getById("14327495"))
// handle(listByLocation("56.491161", "8.583960", excluded, 1)) // struer
// handle(listByLocation({ lat: "55.676788", lon: "12.505840", viewed: excluded }))  // frb
// handle(getById("14338408"))
// handle(getByIds(["13939800","14170505"]))

