// app/api/route.js

import { NextResponse } from 'next/server';
import connectToDatabase from '../../utils/mongodb';

export async function POST(req) {
  const { fullName, email, age, workshop } = await req.json();

  if (!fullName || !email || !age || !workshop) {
    return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
  }

  try {
    const db = await connectToDatabase();
    const usersCollection = db.collection('users');
    const workshopsCollection = db.collection('workshops');

    // Check if user already exists
    let user = await usersCollection.findOne({ email });

    if (!user) {
      // Create new user if not exists
      const newUser = {
        fullName,
        email,
        age,
        registeredWorkshops: [workshop]  // Initialize with the current workshop
      };

      const result = await usersCollection.insertOne(newUser);
      user = result.ops[0]; // Retrieve the inserted user document
    } else {
      // Update existing user's registeredWorkshops array
      await usersCollection.updateOne(
        { _id: user._id },
        { $addToSet: { registeredWorkshops: workshop } }
      );

      // Fetch updated user document
      user = await usersCollection.findOne({ email });
    }

    // Update or create workshop entry
    let existingWorkshop = await workshopsCollection.findOne({ workshopName: workshop });

    if (!existingWorkshop) {
      // Create new workshop if not exists
      const newWorkshop = {
        workshopName: workshop,
        registeredUsers: [{ userId: user._id, registrationDate: new Date() }]
      };

      await workshopsCollection.insertOne(newWorkshop);
    } else {
      // Add user to existing workshop's registeredUsers array
      await workshopsCollection.updateOne(
        { _id: existingWorkshop._id },
        { $addToSet: { registeredUsers: { userId: user._id, registrationDate: new Date() } } }
      );
    }

    return NextResponse.json({ message: 'Registration successful', data: { user, workshop } }, { status: 201 });
  } catch (error) {
    console.error('Registration failed:', error);
    return NextResponse.json({ message: 'Registration failed. Please try again.' }, { status: 500 });
  }
}
