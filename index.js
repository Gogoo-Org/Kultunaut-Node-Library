const { getById, getByIds, listByLocation, search } = require("./kultunaut-node-lib/events.js")

const handle = (fun) => Promise.resolve(fun).then((e) => e.map((i) => {
    if (i && i.Tags && i.Tags.length > 0) {
        console.log(i)
    }
}));

const excluded = ['14388752', '14396556', '14316105', '14397320', '14321961', '14396951', '14403178']

handle(listByLocation({ lat: "55.676788", lon: "12.505840", viewed: excluded }))  // frb
handle(search({ lat: "55.676788", lon: "12.505840", viewed: excluded }))  // frb

// handle(listByLocation("56.491161", "8.583960", excluded, 1)) // struer

//handle(getById("13939800"))
// handle(getByIds(["13939800","14170505"]))

exports = { getById, getByIds, listByLocation }