const Place = require('../models/place');
const { cloudinary } = require('../cloudinary')
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const geocoder = mbxGeocoding({ accessToken: process.env.MAPBOX_TOKEN });

module.exports.index = async (req, res) => {
    const places = await Place.find({});
    res.render('places/index', { places })
};

module.exports.renderNewForm = (req, res) => {
    res.render('places/new');
};

module.exports.createPlace = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.place.location,
        limit: 1
    }).send()
    const place = new Place(req.body.place);
    place.geometry = geoData.body.features[0].geometry;
    place.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    place.author = req.user._id;
    await place.save();
    console.log(place);
    req.flash('success', 'Successfully added a new place')
    res.redirect(`/places/${place._id}`)
};

module.exports.showPlace = async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!place) {
        req.flash('error', 'Cannot find that place');
        res.redirect('/places');
    }
    res.render('places/show', { place });
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const place = await Place.findById(id);
    if (!place) {
        req.flash('error', 'Cannot find that place');
        res.redirect('/places');
    }
    res.render('places/edit', { place });
};

module.exports.updatePlace = async (req, res) => {
    const { id } = req.params;
    console.log(req.body)
    const place = await Place.findByIdAndUpdate(id, { ...req.body.place });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    place.images.push(...imgs)
    await place.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await place.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        console.log(place);
    }
    req.flash('success', 'Successfully updated the place!')
    res.redirect(`/places/${place._id}`);
};

module.exports.deletePlace = async (req, res) => {
    const { id } = req.params;
    await Place.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted the place!');
    res.redirect('/places')
};