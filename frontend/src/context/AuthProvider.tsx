import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../App/components/supabaseClient";

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

async function signInWithEmail() {
  return await supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  })
}

const AuthProvider = ({ children } : any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN") {
        setUser(session!.user); // session is never null if signed in
      }
    });
    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, signInWithEmail }}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;