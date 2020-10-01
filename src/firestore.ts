import {firestore, initializeApp} from "firebase";
import "firebase/firestore";
import {useState, useEffect} from "react";

type CollectionName = "products" | "users" | "sellers";

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

// Comment out if you want to connect to the production DB
if (location.hostname === "localhost") {
    firestore().settings({
    host: "localhost:8080",
    ssl: false
  });
}

export const useCollection = (collectionName: CollectionName) => {
    const [values, setValues] = useState<any[]>([]);
    useEffect(() => {
        return firestore().collection(collectionName).onSnapshot((snapshot) => {
            const data = dataCollection(snapshot)
            setValues(data);
        });
    }, [collectionName])
    return values;
}

export const useDocument = <T extends object>(collectionName: CollectionName, documentID: string) => {
    const [value, setValue] = useState<T>({} as any);
    useEffect(() => {
        return firestore().collection(collectionName).doc(documentID).onSnapshot((snapshot) => {
            const data = dataDoc(snapshot)
            setValue(data as any);
        })
    }, [collectionName, documentID])
    return value;
}

const dataCollection = (snapshot: firestore.QuerySnapshot) => {
    return snapshot.docs.map(doc => ({...doc.data(), id: doc.id}));
}

const dataDoc = (snapshot: firestore.DocumentSnapshot) => {
    return {...snapshot.data(), id: snapshot.id}
}


export const createDoc = (
    collectionName: CollectionName,
    converter: firestore.FirestoreDataConverter<any>,
    value: any
) => {
    return firestore()
        .collection(collectionName)
        .withConverter(converter)
        .add(value);
}
