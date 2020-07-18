import firebase from "firebase";
import "firebase/firestore";
import {useState, useEffect} from "react";

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

firebase.initializeApp(firebaseConfig);

export const useCollection = () => {
    const [products, setProducts] = useState<any[]>([]);
    useEffect( () => {
        firebase.firestore().collection("products").onSnapshot((snapshot) => {
            const data = dataCollection(snapshot)
            setProducts(data);
        })
    }, [])
    return products;
}

const dataCollection = (snapshot: firebase.firestore.QuerySnapshot) => {
    return snapshot.docs.map( doc => doc.data());
}