
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore/lite";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyALpIPkLpsIsyUt2_EFWc7ak9eKzhiP17M",
  authDomain: "ad-vanlife.firebaseapp.com",
  projectId: "ad-vanlife",
  storageBucket: "ad-vanlife.firebasestorage.app",
  messagingSenderId: "348395118809",
  appId: "1:348395118809:web:44107d9efbd1e2162adec8",
  measurementId: "G-38GHNSYVJY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);


// Refactoring the fetching functions below
const vansCollection = collection(db, "vans");

export async function getVans() {
    const snapshot = await getDocs(vansCollection);
    const vans = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return vans;
}

export async function getVan(id) {
    const docRef = doc(db, "vans", id)
    const snapshot = await getDoc(docRef)
    return { ...snapshot.data(), id: snapshot.id };
}


// refactoring the host vans fetching functions below

export async function getHostVans() {
    const q = query(vansCollection, where("hostId", "==", "123"));
    const snapshot = await getDocs(q);
    const vans = snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
    return vans;
}

// export async function getHostVans(id) {
//     const url = id ? `/api/host/vans/${id}` : "/api/host/vans"
//     const res = await fetch(url)
//     if (!res.ok) {
//         throw {
//             message: "Failed to fetch vans",
//             statusText: res.statusText,
//             status: res.status
//         }
//     }
//     const data = await res.json()
//     return data.vans
// }

export async function loginUser(creds) {
    const res = await fetch("/api/login",
        { method: "post", body: JSON.stringify(creds) }
    )
    const data = await res.json()

    if (!res.ok) {
        throw {
            message: data.message,
            statusText: res.statusText,
            status: res.status
        }
    }

    return data
}