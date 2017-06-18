/**
 * Module dependencies.
 */

const mongoose = require('mongoose');

// const Imager = require('imager');
// const config = require('../../config');
// const imagerConfig = require(config.root + '/config/imager.js');

const Schema = mongoose.Schema;

/**
 * Article Schema
 */

const ArticleSchema = new Schema({
    title: { type : String, default : '', trim : true },
    body: { type : String, default : '', trim : true },
    createdAt  : { type : Date, default : Date.now }
});

/**
 * Validations
 */

ArticleSchema.path('title').required(true, 'Article title cannot be blank');
ArticleSchema.path('body').required(true, 'Article body cannot be blank');

/**
 * Pre-remove hook
 */

ArticleSchema.pre('remove', function (next) {
    // const imager = new Imager(imagerConfig, 'S3');
    // const files = this.image.files;

    // if there are files associated with the item, remove from the cloud too
    // imager.remove(files, function (err) {
    //   if (err) return next(err);
    // }, 'article');

    next();
});

/**
 * Methods
 */

ArticleSchema.methods = {

    /**
     * Save article and upload image
     *
     * @param {Object} images
     * @api private
     */

    uploadAndSave: function (image) {
        const err = this.validateSync();
        if (err && err.toString()) throw new Error(err.toString());
        return this.save();

      /*
       if (images && !images.length) return this.save();
       const imager = new Imager(imagerConfig, 'S3');

       imager.upload(images, function (err, cdnUri, files) {
       if (err) return cb(err);
       if (files.length) {
       self.image = { cdnUri : cdnUri, files : files };
       }
       self.save(cb);
       }, 'article');
       */
    }

};

/**
 * Statics
 */

ArticleSchema.statics = {

    /**
     * Find article by id
     *
     * @param {ObjectId} id
     * @api private
     */

    load: function (_id) {
        return this.findOne({ _id })
            // .populate('user', 'name email username')
            // .populate('comments.user')
            .exec();
    },

    /**
     * List articles
     *
     * @param {Object} options
     * @api private
     */

    list: function (options) {
        const criteria = options.criteria || {};
        const page = options.page || 0;
        const limit = options.limit || 30;
        return this.find(criteria)
            // .populate('user', 'name username')
            .sort({ createdAt: -1 })
            .limit(limit)
            .skip(limit * page)
            .exec();
    }
};

mongoose.model('Article', ArticleSchema);
