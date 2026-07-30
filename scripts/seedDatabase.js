import { db } from '../src/firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';
import { kaSchemes, kaPrices, kaAnnouncements, initialComplaints } from '../src/components/VillagerScreens.jsx';

const seedDatabase = async () => {
  console.log("Seeding database...");

  try {
    // 1. Seed Schemes
    console.log("Seeding schemes...");
    for (const scheme of kaSchemes) {
      await setDoc(doc(collection(db, 'schemes'), scheme.id), scheme);
    }

    // 2. Seed Prices
    console.log("Seeding prices...");
    // Since prices don't have unique string IDs, we'll use their crop name (slugified)
    for (const price of kaPrices) {
      const id = price.crop.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '');
      await setDoc(doc(collection(db, 'prices'), id), price);
    }

    // 3. Seed Announcements
    console.log("Seeding announcements...");
    for (const ann of kaAnnouncements) {
      await setDoc(doc(collection(db, 'announcements'), String(ann.id)), ann);
    }

    // 4. Seed Complaints (just as a base to verify the collection exists)
    console.log("Seeding complaints...");
    for (const comp of initialComplaints) {
      await setDoc(doc(collection(db, 'complaints'), comp.id), comp);
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
