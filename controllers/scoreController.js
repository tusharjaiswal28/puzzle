const Score = require('../models/Score');

exports.submitScore = async (req, res) => {
    const { time } = req.body;

    try {
        const score = await Score.create({
            user: req.user._id,
            time,
        });
        res.status(201).json(score);
    } catch (err) {
        res.status(500).json({ message: "Failed to submit score", error: err.message });
    }
};

exports.getAllScores = async (req, res) => {
    try {
        const scores = await Score.find()
            .populate('user', 'name')
            .sort({ time: 1, createdAt: 1 });

        res.status(200).json(scores);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch scores", error: err.message });
    }
};
