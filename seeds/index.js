const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random100 = Math.floor(Math.random() * 100);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '5fd3a8c8cd55c700f06848d4',
            location: `${cities[random100].city}, ${cities[random100].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                 type: 'Point', 
                 coordinates: [
                     cities[random100].longitude,
                     cities[random100].latitude,
                 ]
            },
            images: [ 
                {
                    url: 'https://res.cloudinary.com/dxjqludi3/image/upload/v1608098646/YelpCamp/ypwcxggakpdherv72lmt.jpg',
                    filename: 'YelpCamp/ypwcxggakpdherv72lmt' 
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})