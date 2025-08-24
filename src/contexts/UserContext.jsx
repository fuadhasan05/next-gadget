"use client";
import { createContext, useContext, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        try {
          const response = await fetch(`/api/user?email=${session.user.email}`);
          const data = await response.json();
          
          if (response.ok) {
            setUserData(data.user);
          } else {
            console.error('Failed to fetch user data:', data.error);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session]);

  const value = {
    user: userData,
    loading,
    updateUser: setUserData
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}