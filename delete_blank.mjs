import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  authDomain: "gramsetu-ed75a.firebaseapp.com",
  projectId: "gramsetu-ed75a",
  storageBucket: "gramsetu-ed75a.firebasestorage.app",
  messagingSenderId: "190769157449",
  appId: "1:190769157449:web:84ff601639847a88a8f698"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function deleteBlank() {
  const collections = ['complaints', 'feedback'];
  for (const col of collections) {
    const snap = await getDocs(collection(db, col));
    for (const d of snap.docs) {
      const data = d.data();
      if (!data.title && !data.subject) {
        await deleteDoc(doc(db, col, d.id));
        console.log(`Deleted blank entry ${d.id} from ${col}`);
      }
    }
  }
  console.log('Done!');
  process.exit(0);
}

deleteBlank();
