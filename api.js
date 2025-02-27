// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
} from 'firebase/firestore';

// Your web app's Firebase configuration
import firebaseCreds from './firebaseCreds.js';

const firebaseConfig = firebaseCreds();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
console.log(db);
// Refactor fetching functions
const vansCollectionRef = collection(db, 'vans');

export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef);
    const vans = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return vans;
}

export async function getVan(id) {
    const vanDoc = doc(db, 'vans', id);
    const snapshot = await getDoc(vanDoc);
    if (snapshot.exists()) {
        return {
            ...snapshot.data(),
            id: snapshot.id,
        };
    } else {
        throw {
            message: 'Van not found',
            statusText: 'Not Found',
            status: 404,
        };
    }
}

export async function getVansMock(id) {
    const url = id ? `/api/vans/${id}` : '/api/vans';
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: 'Failed to fetch vans',
            statusText: res.statusText,
            status: res.status,
        };
    }
    const data = await res.json();
    return data.vans;
}

export async function getHostVans(id) {
    const url = id ? `/api/host/vans/${id}` : '/api/host/vans';
    const res = await fetch(url);
    if (!res.ok) {
        throw {
            message: 'Failed to fetch vans',
            statusText: res.statusText,
            status: res.status,
        };
    }
    const data = await res.json();
    return data.vans;
}

export async function loginUser(creds) {
    const res = await fetch('/api/login', {
        method: 'post',
        body: JSON.stringify(creds),
    });
    const data = await res.json();

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status,
        };
    }

    return data;
}
