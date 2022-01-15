const UserRepository = require('../repositories/UserRepository');

async function all(_, res) {
    const users = await UserRepository.all();

    return res.json({
        data: users,
    });
}

async function find(req, res) {
    const user = await UserRepository.findOrNull(req.params.id);

    if (user == null) {
        res.status(404);

        return res.json({ message: 'User not found' });
    }

    return res.json(user);
}

async function create(req, res) {
    const {
        name,
        age,
        bio,
        image,
    } = req.body;

    const user = await UserRepository.save({
        name,
        age,
        bio,
        image,
    });

    res.status(201);

    return res.json(user);
}

async function update(req, res) {
    const user = await UserRepository.findOrNull(req.params.id);

    if (user == null) {
        res.status(404);

        return res.json({ message: 'User not found' });
    }

    const {
        name,
        age,
        bio,
        image,
    } = req.body;

    await UserRepository.update(user, {
        name,
        age,
        bio,
        image,
    });

    res.status(204);

    return res.json();
}

async function destroy(req, res) {
    const user = await UserRepository.findOrNull(req.params.id);

    if (user == null) {
        res.status(404);

        return res.json({ message: 'User not found' });
    }

    await UserRepository.remove(user);

    res.status(204);
    return res.json({});
}

module.exports = {
    all,
    find,
    create,
    update,
    destroy,
};
