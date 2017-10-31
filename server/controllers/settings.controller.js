import Settings from '../models/settings.model';

// Settings.remove({}).exec(function (err) {
//     if(err){
//         console.log(err);
//         return;
//     }
// });


function load(req, res, next) {

    return Settings
        .get(req.params.settingsId)
        .then(category => {
            return res.json(category);
        })
        .catch(e => next(e));
}

function get(req, res, next) {
    return load(req, res, next);
}

function update(req, res, next) {
    Settings
        .get(req.params.settingsId)
        .then((settings) => {
            settings = req.body;

            return settings;
        })
        .then((settings) =>{
            settings.save()
                .then(result => {
                    res.status(200);
                    return res.json(result);
                })
                .catch(e => {
                    res.status(404);
                    return res.send({reason: e});
                });
        })
        .catch(e =>next(e));
}

function list(req, res, next) {
    const {limit = 50, skip = 0} = req.query;
    Settings.list({limit, skip})
        .then(settings => {
            res.json(settings);
        })
        .catch(e => next(e));
}

function remove(req, res, next) {
    Settings
        .get(req.params.settingsId)
        .then((settings) => {
            settings.remove();
            res.status(200);
            return res.send({reason: 'Settings deleted!'});
        })
        .catch(e => next(e));
}

export default {load, get, update, list, remove};
