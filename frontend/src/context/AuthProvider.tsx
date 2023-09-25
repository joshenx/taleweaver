import { User } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../App/components/supabaseClient';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

const login = (email: string, password: string) =>
  supabase.auth.signInWithPassword({ email, password });

const signOut = () => supabase.auth.signOut();

const passwordReset = (email: string) =>
  supabase.auth.resetPasswordForEmail(email, {
    redirectTo: 'http://localhost:5173/update-password',
  });

const updatePassword = (updatedPassword: string) =>
  supabase.auth.updateUser({ password: updatedPassword });

const AuthProvider = ({ children }: any) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState<User | null>(null);
  const [auth, setAuth] = useState(false);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      console.log(`Supabase auth event: ${event}`);
      if (event == 'PASSWORD_RECOVERY') {
        setAuth(false);
      } else if (event === 'SIGNED_IN') {
        setUser(session!.user); // session is never null if signed in
        setAuth(true);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setAuth(false);
      } else if (event === 'INITIAL_SESSION') {
        setUser(session!.user);
        setAuth(true);
      }
      setSession(session);
    });

    setLoading(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        auth,
        user,
        login,
        signOut,
        passwordReset,
        updatePassword,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
