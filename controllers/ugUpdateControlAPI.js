const ugUpdate = require('../models/ugUpdate');

const ug_update_list = (req, res, enabled) => {
    if (enabled === null) {
        filter = {};
    }
    else {
        filter = { enabled: enabled };
    }

    ugUpdate.find(filter)
        .sort({ updatedAt: -1 })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const ug_update_list_all = (req, res) => {
    ug_update_list(req, res, null);
};

const ug_update_list_enabled = (req, res) => {
    ug_update_list(req, res, true);
};

const ug_update_list_disabled = (req, res) => {
    ug_update_list(req, res, false);
};

const ug_update_create = (req, res) => {
    const update = new ugUpdate(req.body);

    update.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        });
};


const ug_update_details = (req, res) => {
    const id = req.params.id;
    // check ID validity
    ugUpdate.findById(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const ug_update_delete = (req, res) => {
    const id = req.params.id;
    ugUpdate.findByIdAndDelete(id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

const ug_update_patch = (req, res) => {
    const id = req.params.id;
    ugUpdate.updateOne(
        {
            _id: id
        },
        req.body)
        .then((result) => {
            if (req.body.enabled === 'true') {
                destination = 'disabled';
            }
            else {
                destination = 'all';
            }

            res.json(result);
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = {
    ug_update_list_all,
    ug_update_list_enabled,
    ug_update_list_disabled,
    ug_update_create,
    ug_update_details,
    ug_update_delete,
    ug_update_patch
};