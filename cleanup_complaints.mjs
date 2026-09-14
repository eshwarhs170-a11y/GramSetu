import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY || "dummy",
  authDomain: "gramsetu-ed75a.firebaseapp.com",
  projectId: "gramsetu-ed75a",
  storageBucket: "gramsetu-ed75a.firebasestorage.app",
  messagingSenderId: "190769157449",
  appId: "1:190769157449:web:84ff601639847a88a8f698"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function cleanup() {
  try {
    const colRef = collection(db, 'complaints');
    const snapshot = await getDocs(colRef);
    
    // Sort documents by createdAt timestamp, descending (newest first)
    const docs = snapshot.docs.map(d => ({ id: d.id, data: d.data() }));
    docs.sort((a, b) => {
      const tA = a.data.createdAt?.toMillis ? a.data.createdAt.toMillis() : 0;
      const tB = b.data.createdAt?.toMillis ? b.data.createdAt.toMillis() : 0;
      return tB - tA; // descending
    });

    // Keep the first 2 (newest) complaints from users
    const toDelete = docs.slice(2);

    console.log(`Found ${docs.length} total complaints. Keeping the newest 2. Deleting ${toDelete.length}...`);

    for (const docObj of toDelete) {
      await deleteDoc(doc(db, 'complaints', docObj.id));
      console.log(`Deleted ${docObj.id}`);
    }

    console.log('Cleanup complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
}

cleanup();
