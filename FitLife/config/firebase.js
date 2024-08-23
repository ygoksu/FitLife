import { useEffect, useState } from "react";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getFirestore,
  onSnapshot,
  deleteDoc,
  addDoc,
  getDocs,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateCurrentUser,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
export const firebaseConfig = {
  apiKey: "AIzaSyCW3z5sv2H_8-J0Yd1jcBcU_UR4vTNiJ_s",
  authDomain: "fir-2e3cb.firebaseapp.com",
  projectId: "fir-2e3cb",
  storageBucket: "fir-2e3cb.appspot.com",
  messagingSenderId: "624283603853",
  appId: "1:624283603853:web:1404f2134ce25c2fc7a3c4",
};

export const app = initializeApp(firebaseConfig);
getAnalytics(app);
export const auth = getAuth(app);

export const signUp = async (name, email, password) => {
  await createUserWithEmailAndPassword(auth, email, password);
  updateCurrentUser(auth, { displayName: name });
};
export const signIn = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

const db = getFirestore(app);
export { db };
const productsRef = collection(db, "kullanici");

export const addProduct = (authData) => {
  addDoc(productsRef, authData);
  // Burada dökümantasyona bir ıd vermek istiyorum. Şuanda dökümanın ıd si random bir şekilde belirleniyor. Bunu nasıl çözerim ?
  console.log("Kayıt Gerçekleşti");
};

export const insert = async (tabloadı, authData) => {
  console.log(tabloadı);
  console.log(authData);
  await setDoc(doc(db, tabloadı, authData.uıd), authData);
};

export const insert2 = async (tabloadı, authData) => {
  const koleksiyonRef = collection(db, tabloadı);
  try {
    await addDoc(koleksiyonRef, authData);
    console.log("Belge başarıyla eklendi");
  } catch (error) {
    console.error("Belge eklenirken bir hata oluştu", error);
  }
};

export const storage = getStorage(app);

export const newpassword = async (email) => {
  sendPasswordResetEmail(auth, email);
  window.location = "/";
};

// Buraya databaseden veri çekecek bir fonksiyon istiyorum

export const vericek = async (tabloadı) => {
  const querySnapshot = await getDocs(collection(db, tabloadı));
  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });
  return products;
};
