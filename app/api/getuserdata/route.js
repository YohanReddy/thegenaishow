// pages/api/getUserData.js

import { connectToDatabase } from '../../utils/mongodb';

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { user } = req.query;

    try {
        const { db } = await connectToDatabase();
        const userData = await db.collection('users').find({ user }).toArray(); // Specify your collection name here
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ message: 'Error fetching user data' });
    }
}
