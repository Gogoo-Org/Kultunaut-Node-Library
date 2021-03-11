const {getById, getByIds, listByLocation} =  require("./kultunaut-node-lib/events.js")

const handle = (fun)=> Promise.resolve(fun).then((e)=>console.log(e.length));

handle(listByLocation("55.676788", "12.505840"))
// handle(listByLocation("56.491161", "8.583960")) struer

// handle(getById("13939800"))
// handle(getByIds(["13939800","14170505"]))

exports = {getById, getByIds, listByLocation}