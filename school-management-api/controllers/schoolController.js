const db = require('../config/db');
const calculateDistance = require('../utils/calculateDistance');

const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).send('Invalid input');
    }

    const query = `INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)`;

    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send('School added successfully');
    });
};

const listSchools = (req, res) => {
    const { latitude, longitude } = req.query;

    const userLat = parseFloat(latitude);
    const userLng = parseFloat(longitude);

    if (isNaN(userLat) || isNaN(userLng)) {
        return res.status(400).send('Invalid coordinates');
    }

    const query = `SELECT id, name, address, latitude, longitude FROM schools`;

    db.query(query, (err, results) => {
        if (err) return res.status(500).send(err);

        const sortedSchools = results.map((school) => {
            const distance = calculateDistance(userLat, userLng, school.latitude, school.longitude);
            return { ...school, distance };
        }).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    });
};

module.exports = {
    addSchool,
    listSchools,
};
