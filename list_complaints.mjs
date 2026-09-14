import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const firebaseConfig = {
  authDomain: "gramsetu-ed75a.firebaseapp.com",
  projectId: "gramsetu-ed75a",
  storageBucket: "gramsetu-ed75a.firebasestorage.app",
  messagingSenderId: "190769157449",
  appId: "1:190769157449:web:84ff601639847a88a8f698"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function listComplaints() {
  const snap = await getDocs(collection(db, 'complaints'));
  console.log(`Total complaints: ${snap.docs.length}`);
  snap.docs.forEach(d => {
    const data = d.data();
    console.log(`ID: ${d.id} | title: "${data.title || data.subject || '(no title)'}" | hasPhoto: ${!!data.photo} | date: ${data.date || data.createdAt}`);
  });
  process.exit(0);
}

listComplaints();
