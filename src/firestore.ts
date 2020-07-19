import {firestore, initializeApp} from "firebase";
import "firebase/firestore";
import {useState, useEffect} from "react";

type CollectionName = "products" | "users";

const firebaseConfig = {
    apiKey: "AIzaSyAOkHPIlszN_LLyixr0Ez4UlXneVHQhfBY",
    authDomain: "veggiemarket-5237c.firebaseapp.com",
    databaseURL: "https://veggiemarket-5237c.firebaseio.com",
    projectId: "veggiemarket-5237c",
    storageBucket: "veggiemarket-5237c.appspot.com",
    messagingSenderId: "992856431901",
    appId: "1:992856431901:web:b69f53fa68adc180e295f4",
    measurementId: "G-STGW946JTW"
  };

initializeApp(firebaseConfig);

export const useCollection = (collectionName: CollectionName) => {
    const [values, setValues] = useState<any[]>([]);
    useEffect( () => {
        return firestore().collection(collectionName).onSnapshot((snapshot) => {
            const data = dataCollection(snapshot)
            setValues(data);
        });
    }, [collectionName])
    return values;
}

const dataCollection = (snapshot: firestore.QuerySnapshot) => {
    return snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
}


export const createDoc = (collectionName: CollectionName) => {
    return firestore().collection(collectionName).add({
        name: "apricot",
        price: 4,
        unit: "kg",
        stock: 20,
        image: "https://images.unsplash.com/photo-1567779833503-606dc39a14fd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=60"
    })
}

