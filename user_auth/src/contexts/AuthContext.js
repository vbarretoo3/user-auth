import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase';

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider( {children } ) {
  const [loading, setLoading] = useState(false)
  const [currentUser, setCurrentUser] = useState()

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password)
  }

  function logIn(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(true)
    })

    return unsubscribe
  }, [])

  const value = {
    signup,
    logIn,
    logout,
    resetPassword,
    currentUser,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {loading && children}
    </AuthContext.Provider>
  )
}
