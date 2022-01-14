
function all(_, res, _) {
    return res.json({
        data: [
            {
                id: "PI31416",
                name: 'Joe Doe',
                age: 22,
                bio: 'A very special guy',
                image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png'
            }
        ]
    });
}

function find(req, res, _) {
    return res.json({
        id: "PI31416",
        name: 'Joe Doe',
        age: 22,
        bio: 'A very special guy',
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png'
    });
}

function create(req, res, _) {
    res.status(201);

    return res.json({
        id: "PI31416",
        name: 'Joe Doe',
        age: 22,
        bio: 'A very special guy',
        image: 'http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png'
    });
}

function update(req, res, _) {
    res.status(204);

    return res.json({
        message: 'User updated successfully'
    });
}

function destroy(req, res, _) {
    res.status(204);

    return res.json({
        message: 'User deleted successfully'
    });
}

module.exports = {
    all,
    find,
    create,
    update,
    destroy
}