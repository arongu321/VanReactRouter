// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
    getFirestore,
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
} from 'firebase/firestore/lite';

// Your web app's Firebase configuration
import firebaseCreds from './firebaseCreds.js';

const firebaseConfig = firebaseCreds();

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Refactor fetching functions
const vansCollectionRef = collection(db, 'vans');

// Function to fetch vans from Firestore database
export async function getVans() {
    const snapshot = await getDocs(vansCollectionRef);
    const vans = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return vans;
}

// Function to fetch a single van from Firestore database
export async function getVan(id) {
    const vanDoc = doc(db, 'vans', id);
    const timeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), 10000)
    );
    const request = getDoc(vanDoc).then((snapshot) => {
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
    });

    return Promise.race([timeout, request]);
}

// Function to fetch vans from mock API
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

// Function to fetch vans owned by user of hostId 123(for testing only)
export async function getHostVans() {
    const q = query(vansCollectionRef, where('hostId', '==', '123'));
    const snapshot = await getDocs(q);
    const vans = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
    }));
    return vans;
}

// Function to fetch vans owned by user of hostId 123 from mock API
export async function getHostVansMock(id) {
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

// Function to login user using mock API
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
