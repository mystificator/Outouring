const mongoose = require('mongoose');
const Place = require('../models/place');
const { names, descriptors } = require('./seedHelpers');
const cities = require('./cities');


mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/outouring')
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!");
    })
    .catch((err) => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!");
        console.log(err);
    })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Place.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 213);
        const camp = new Place({
            author: '641de8af980ad6f352408873',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(names)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla a non natus repellat, ratione dolores vitae illum suscipit ex inventore. Ipsum incidunt dolores sint aut? Ab voluptatum ad assumenda saepe!',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dvhfhfi1z/image/upload/v1679696564/Outouring/default02_nmyn6b.jpg',
                    filename: 'Outouring/wskhqcyampulvp42gvc1',
                },
                {
                    url: 'https://res.cloudinary.com/dvhfhfi1z/image/upload/v1679726229/Outouring/beach-boat_p3wb5x.jpg',
                    filename: 'Outouring/kmofqkynpslrrpyygvox',
                }
            ]
        })
        await camp.save();
    }
}

seedDB()
    .then(() => {
        mongoose.connection.close();
    });
