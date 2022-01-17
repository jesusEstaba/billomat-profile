const UserRepository = require('../repositories/UserRepository');

async function average(_, res) {
    const averageAge = await UserRepository.getAverageAge();

    return res.json({
        average_age: averageAge,
    });
}

module.exports = {
    average,
};
