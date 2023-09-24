import { useState, useEffect } from 'react'
import { supabase } from '../../App/components/supabaseClient'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Session } from '@supabase/supabase-js';
import SimpleCard from './chakra';

export default function Login() {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, []);

  if (!session) {
    return (<Auth
      supabaseClient={supabase} 
      appearance={{ theme: ThemeSupa }} 
      providers={['google', 'facebook', 'github', 'apple']}
    />);
  } else {
    return (
      <div>
        <p>Logged in</p>
        <button onClick={() => supabase.auth.signOut()}>Sign out</button>
      </div>
    )
  }
}


