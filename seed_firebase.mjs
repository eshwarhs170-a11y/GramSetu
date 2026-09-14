import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "dummy", // Not strictly needed for unauthenticated writes if rules allow, but we need the project ID
  authDomain: "gramsetu-ed75a.firebaseapp.com",
  projectId: "gramsetu-ed75a",
  storageBucket: "gramsetu-ed75a.firebasestorage.app",
  messagingSenderId: "190769157449",
  appId: "1:190769157449:web:84ff601639847a88a8f698"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function seed() {
  try {
    // 1. Add Feedback
    const feedbackRef = await addDoc(collection(db, 'feedback'), {
      farmerName: 'Ramesh Gowda',
      village: 'Halli',
      contact: '9876543210',
      message: 'When will the next batch of seeds arrive at RSK?',
      timestamp: new Date().toISOString(),
      type: 'question'
    });
    console.log('Added feedback document:', feedbackRef.id);

    // 2. Add Official Response
    const responseRef = await addDoc(collection(db, 'official_responses'), {
      complaintId: 'GS-KA-0456',
      officialName: 'Suresh PDO',
      department: 'Rural Development',
      replyMessage: 'The borewell pump has been inspected and parts ordered. It will be fixed by tomorrow.',
      timestamp: new Date().toISOString()
    });
    console.log('Added official response document:', responseRef.id);
    
    console.log('Successfully seeded both collections!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
}

seed();
