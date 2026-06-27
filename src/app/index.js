import Dictionary from "./view/Dictionary";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from "react";
import LoginScreen from './../database/LoginScreen'
import { Keys } from "../config/Keys";

export default function App() {

  useEffect(() => {
    FetchAllWord();
  }, []);

  async function FetchAllWord() {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");

      if (res.ok) {
        const data = await res.json();
        
        // Save to AsyncStorage
        await AsyncStorage.setItem(Keys.dictionary, JSON.stringify(data));
        
        console.log("✅ Data saved successfully to AsyncStorage");
      } else {
        console.log("❌ Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return <LoginScreen />;
}