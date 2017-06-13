/*
 * Module dependencies.
 */

const articles = require('../app/controllers/articles');

module.exports = function (app, express) {

    const router = express.Router();

    /* GET home page. */
    router.get('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    });
    app.use('/', router);

    // article routes
    app.param('id', articles.load);
    app.get('/articles/:id', articles.show);
    app.get('/articles', articles.index);
    app.get('/articles/:id/edit', articles.edit);
    app.put('/articles/:id', articles.update);
    app.delete('/articles/:id', articles.destroy);

// catch 404 and forward to error handler
    app.use(function(req, res, next) {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handler
    app.use(function(err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
};
