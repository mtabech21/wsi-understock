import { createContext, useState, useRef, useContext, useEffect } from "react";
import "./App.css";
import "./styles.css";
import MiddleUnderstock from "./MiddleUnderstock";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5IWIPhxhxY5hcGgdMZ1EioHbSDJ9ciiw",
  authDomain: "fossil-group-bf6dc.firebaseapp.com",
  projectId: "fossil-group-bf6dc",
  storageBucket: "fossil-group-bf6dc.appspot.com",
  messagingSenderId: "195795059079",
  appId: "1:195795059079:web:b3bd3774dfeef0069d1322",
  measurementId: "G-Y8WV6KWCMM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const useSearch = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [current, set] = useState("");

  return { current, set, ref };
};

type Search = {
  set: React.Dispatch<React.SetStateAction<string>>;
  current: string;
  ref: React.RefObject<HTMLInputElement>;
};
export type USData = {
  a: string[];
  b: string[];
  c: string[];
  d: string[];
  e: string[];
  f: string[];
  g: string[];
  h: string[];
  i: string[];
  j: string[];
};

export class WSIUS {
  a: string[] = [];
  b: string[];
  c: string[];
  d: string[];
  e: string[];
  f: string[];
  g: string[];
  h: string[];
  i: string[];
  j: string[];
  constructor(
    a: string[] = [],
    b: string[] = [],
    c: string[] = [],
    d: string[] = [],
    e: string[] = [],
    f: string[] = [],
    g: string[] = [],
    h: string[] = [],
    i: string[] = [],
    j: string[] = []
  ) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
    this.f = f;
    this.g = g;
    this.h = h;
    this.i = i;
    this.j = j;
  }
}

const DataConverter = {
  toFirestore: (cabinets: WSIUS) => {
    return {
      a: cabinets.a,
      b: cabinets.b,
      c: cabinets.c,
      d: cabinets.d,
      e: cabinets.e,
      f: cabinets.f,
      g: cabinets.g,
      h: cabinets.h,
      i: cabinets.i,
      j: cabinets.j,
    };
  },
  fromFirestore: (snapshot: { data: (arg0: any) => any }, options: any) => {
    const data = snapshot.data(options);
    return new WSIUS(
      data.a,
      data.b,
      data.c,
      data.d,
      data.e,
      data.f,
      data.g,
      data.h,
      data.i,
      data.j
    );
  },
};

//@ts-ignore
export const context = createContext<Search>();

let db = getFirestore(app);

const App: React.FC = () => {
  const search = useSearch();
  const [data, setData] = useState<WSIUS>(new WSIUS());
  const cabinetsRef = doc(db, "wsi-understock", "cabinets").withConverter(
    DataConverter
  );

  const getData = async () => {
    const docSnap = await getDoc(cabinetsRef);
    console.log(cabinetsRef);
    if (docSnap.exists()) {
      console.log(docSnap);
      let newData = docSnap.data();
      setData(newData);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <context.Provider value={search}>
      <div className="App">
        <h2>Watch Station Understock</h2>
        <TextField />
        <MiddleUnderstock data={data} />
      </div>
    </context.Provider>
  );
};

const TextField: React.FC = () => {
  const search = useContext(context);
  useEffect(() => {
    search.ref.current?.focus();
  }, []);

  return (
    <div>
      <input
        type="text"
        ref={search.ref}
        value={search.current}
        onChange={(prev) => search.set(prev.currentTarget.value.toUpperCase())}
        className="searchInput"
      />
    </div>
  );
};

const FBdata = {
  a: [],
  b: [],
  c: [],
  d: [],
  e: [],
  f: [],
  g: [],
  h: [],
  i: [],
  j: [],
};

export default App;
