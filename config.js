const mongoUrl = process.env.MONGO_URL || 'mongodb://leoquip.com:123456@ds053320.mongolab.com:53320/leoquip';
const collectionsList = ["widgets", "products"];
const port = 3001;

//const serverUrl = 'https://widgetserver.herokuapp.com';
const PAGE_LIMIT = 10;
export default {
    mongoUrl,
    collectionsList,
    port,
    PAGE_LIMIT
}