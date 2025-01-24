const db = require('../models');
const SocialClass = db.SocialClass;

exports.getSocialClasses = async (req, res) => {
    try {
        const socialClasses = await SocialClass.findAll();
        res.status(200).json(socialClasses);
    } catch (error) {
        console.error('Error fetching social classes:', error);
        res.status(500).json({ message: 'Error fetching social classes', error });
    }
};

exports.addSocialClass = async (req, res) => {
    try {
        const { class_name } = req.body;
        if (!class_name) {
            return res.status(400).json({ message: 'Class name is required' });
        }
        const newClass = await SocialClass.create({ class_name });
        res.status(201).json(newClass);
    } catch (error) {
        console.error('Error adding social class:', error);
        res.status(500).json({ message: 'Error adding social class', error });
    }
};