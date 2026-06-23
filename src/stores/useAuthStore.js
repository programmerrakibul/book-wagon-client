import { auth } from "@/firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

/**
 * 1. INITIAL STATE STRUCTURE
 * * We use a dual-loading approach to separate app boot from user state transitions:
 * - initialized: Strictly monitors the very first check to Firebase/IndexedDB on app boot.
 * - authLoading: Toggles true/false during active transitions (logins, logouts, registration).
 */
export const initialState = {
  loading: {
    authLoading: true, // Active whenever user credentials or tokens are being fetched
    google: false,
    email: false,
  },
  user: null,
  error: null,
};

/**
 * 2. ZUSTAND STORE CREATION
 * * Uses the Immer middleware allowing mutation-style syntax safely on nested state drafts.
 */
const useAuthStore = create()(
  immer(() => ({
    state: initialState,
  })),
);

/**
 * 3. GLOBAL AUTH STATE STREAM LISTENER
 * * Running at the file level ensures this initializes the microsecond the JS bundle loads,
 * completely independent of React components or hook render passes.
 */
onAuthStateChanged(auth, async (currentUser) => {
  // Turn on active transitions loading state immediately upon discovering a change event
  useAuthStore.setState((draft) => {
    draft.state.loading.authLoading = true;
  });

  let serializedUser = null;
  let token = null;

  if (currentUser) {
    /**
     * SANITIZATION: Firebase user objects contain deep circular references and
     * mutable prototype methods that break Proxy-based state trackers like Immer.
     * We strip it down to a flat, safe, serializable configuration.
     */
    serializedUser = {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      metadata: currentUser.metadata,
      emailVerified: currentUser.emailVerified,
    };

    try {
      // Securely fetch the actual JSON Web Token (JWT) string from the active session
      token = await currentUser.getIdToken();
    } catch (tokenError) {
      console.error("Failed to fetch Firebase auth token:", tokenError);
    }
  }

  /**
   * CLIENT-SIDE STORAGE SYNCHRONIZATION
   * Manages token existence for outgoing server-side API authorization headers.
   */
  if (token) {
    localStorage.setItem("tokenId", token);
  } else {
    localStorage.removeItem("tokenId");
  }

  /**
   * ATOMIC STATE CONSOLIDATION
   * Dispatches the user data and signals the UI that all loading states have completed.
   */
  useAuthStore.setState((draft) => {
    draft.state.user = serializedUser;
    draft.state.error = null;
    draft.state.loading.authLoading = false; // Transition processing finalized
  });
});

/**
 * 4. AUTH ACTION METHODS
 */

/**
 * Handles explicit Email and Password credentials.
 * * NOTE: You do not need to manually push `userCredential.user` to the store here.
 * The global `onAuthStateChanged` stream above will instantly intercept the successful
 * auth token signature, serialize it, and handle the state injection for you.
 * * @param {Object} credentials - The login payload.
 * @param {string} credentials.email - User email address.
 * @param {string} credentials.password - User password.
 * @returns {Promise<User>} The raw Firebase User object upon resolution.
 */
export const loginWithPassword = async ({ email, password }) => {
  // Activate isolated form loading indicators and wipe away previous failed error traces
  useAuthStore.setState((draft) => {
    draft.state.loading.email = true;
    draft.state.error = null;
  });

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    return user;
  } catch (error) {
    console.error(`Error logging in with password: ${error}`);

    // Clear state data and capture the error metadata safely
    useAuthStore.setState((draft) => {
      draft.state.user = null;
      draft.state.error = error.message || "Failed to login!";
    });

    throw error;
  } finally {
    // Terminate local form spinners regardless of an absolute resolve or an exception catch
    useAuthStore.setState((draft) => {
      draft.state.loading.email = false;
    });
  }
};

const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = async () => {
  // Activate isolated form loading indicators and wipe away previous failed error traces
  useAuthStore.setState((draft) => {
    draft.state.loading.google = true;
    draft.state.error = null;
  });

  try {
    const { user } = await signInWithPopup(auth, googleProvider);

    return user;
  } catch (error) {
    console.error(`Error logging in with Google: ${error}`);

    useAuthStore.setState((draft) => {
      draft.state.user = null;
      draft.state.error = error.message || "Failed to login!";
    });

    throw error;
  } finally {
    useAuthStore.setState((draft) => {
      draft.state.loading.google = false;
    });
  }
};

export const createUser = async ({
  displayName,
  photoURL,
  email,
  password,
}) => {
  useAuthStore.setState((draft) => {
    draft.state.error = null;
    draft.state.loading.authLoading = true;
  });

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    await updateUserProfile({ displayName, photoURL });

    return user;
  } catch (error) {
    console.error(`Error creating user: ${error}`);

    useAuthStore.setState((draft) => {
      draft.state.error = error.message || "Failed to create user!";
    });

    throw error;
  } finally {
    useAuthStore.setState((draft) => {
      draft.state.loading.authLoading = false;
    });
  }
};

export const updateUserProfile = async (info) => {
  useAuthStore.setState((draft) => {
    draft.state.error = null;
    draft.state.loading.authLoading = true;
  });

  try {
    await updateProfile(auth.currentUser, info);
  } catch (error) {
    useAuthStore.setState((draft) => {
      draft.state.error = error.message || "Failed to update user profile!";
    });

    console.error(`Error updating user profile: ${error}`);

    throw error;
  } finally {
    useAuthStore.setState((draft) => {
      draft.state.loading.authLoading = false;
    });
  }
};

export const logoutUser = async () => {
  useAuthStore.setState((draft) => {
    draft.state.error = null;
    draft.state.loading.authLoading = true;
  });

  try {
    await signOut(auth);
  } catch (error) {
    console.error(`Error logging out: ${error}`);

    useAuthStore.setState((draft) => {
      draft.state.error = error.message || "Failed to logout!";
    });

    throw error;
  } finally {
    useAuthStore.setState((draft) => {
      draft.state.loading.authLoading = false;
    });
  }
};

export default useAuthStore;
