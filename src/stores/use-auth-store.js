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

/**
 * The initial state configuration for the authentication store.
 * @typedef {Object} AuthState
 * @property {boolean} authLoading - Global initialization flag tracking the primary Firebase session sync and registration pipelines.
 * @property {boolean} googleLoading - Isolated local spinner status reserved strictly for Google OAuth popup streams.
 * @property {boolean} emailLoading - Isolated local spinner status reserved strictly for Email and Password form transitions.
 * @property {Object | null} user - The sanitized, flat user payload, or null if the client session is unauthenticated.
 * @property {string | null} error - Contains the raw descriptive error message string captured from the latest failed execution transaction.
 */

/** @type {AuthState} - The initial state configuration for the authentication store */
export const initialState = {
  authLoading: true, // Global loading state (covers initial boot sync, registrations, etc.)
  googleLoading: false, // Isolated local spinner state for Google OAuth popups
  emailLoading: false, // Isolated local spinner state for Email/Password forms
  user: null, // Sanitized user data object
  error: null, // Global authentication error message string
};

const useAuthStore = create(() => initialState);

/**
 * This listener runs automatically at the file-evaluation level. It hooks into
 * Firebase's client WebSocket pool immediately upon bundle load, operating completely
 * independent of React's lifecycle or layout paint threads.
 */
onAuthStateChanged(auth, async (currentUser) => {
  // Fire a lightweight functional state patch to indicate background validation is in progress
  useAuthStore.setState({ authLoading: true });

  let serializedUser = null;
  let token = null;

  if (currentUser) {
    serializedUser = {
      uid: currentUser.uid,
      email: currentUser.email,
      displayName: currentUser.displayName,
      photoURL: currentUser.photoURL,
      emailVerified: currentUser.emailVerified,
      metadata: currentUser.metadata,
    };

    try {
      /**
       * Passing 'false' instructs Firebase to return an unexpired token from memory cache
       * if available, instead of making a slow, blocking network trip to refresh it.
       */
      token = await currentUser.getIdToken(false);
    } catch (tokenError) {
      console.error("Failed to fetch Firebase auth token:", tokenError);
    }
  }

  /**
   * Persists or clears jwt tokens out of localStorage outside the React tree context.
   * Custom request clients (like Axios) pull directly from here to build authorization headers.
   */
  if (token) {
    localStorage.setItem("__bw__token__", token);
  } else {
    localStorage.removeItem("__bw__token__");
  }

  // Atomic state batch update—updates user profile and closes loading flags simultaneously
  useAuthStore.setState({
    user: serializedUser,
    error: null,
    authLoading: false,
  });
});

/**
 * These actions update the store directly from the standalone module export,
 * making them safe to call inside React components OR pure JS files (like API helpers).
 */

/**
 * Signs in a user using standard Email and Password configurations.
 *  The global `onAuthStateChanged` stream above will catch the successful auth token emission,
 * serialize it, and apply the state update automatically.
 * @param {Object} payload
 * @param {string} payload.email
 * @param {string} payload.password
 */

export const loginWithPassword = async ({ email, password }) => {
  // Isolate form spinner loading and wipe out legacy validation error text traces
  useAuthStore.setState({ emailLoading: true, error: null });

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (error) {
    console.error(`Error logging in with password: ${error}`);
    // Flush active states on explicit validation exceptions
    useAuthStore.setState({
      user: null,
      error: error.message || "Failed to login!",
    });
    throw error;
  } finally {
    // Terminate targeted form spinner safely regardless of resolve or rejection branches
    useAuthStore.setState({ emailLoading: false });
  }
};

// Singleton context instance reference for the Google provider
const googleProvider = new GoogleAuthProvider();

/**
 * Triggers a native federated Identity Provider popup via Google Account parameters.
 */
export const loginWithGoogle = async () => {
  // Isolate Google button spinner specifically so email fields remain interactive
  useAuthStore.setState({ googleLoading: true, error: null });

  try {
    const { user } = await signInWithPopup(auth, googleProvider);
    return user;
  } catch (error) {
    console.error(`Error logging in with Google: ${error}`);
    useAuthStore.setState({
      user: null,
      error: error.message || "Failed to login!",
    });
    throw error;
  } finally {
    useAuthStore.setState({ googleLoading: false });
  }
};

/**
 * Registers a new account, then immediately appends the profile metadata.
 * @param {Object} payload - User registration details
 * @param {string} payload.displayName - User display name
 * @param {string} payload.photoURL - User avatar URL
 * @param {string} payload.email - User email address
 * @param {string} payload.password - User password
 */
export const createUser = async ({
  displayName,
  photoURL,
  email,
  password,
}) => {
  useAuthStore.setState({ authLoading: true, error: null });

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );

    /**
     * Inline profile updates prevent the UI from reading blank user metadata
     * during the temporary network window right after account creation.
     */
    await updateProfile(user, { displayName, photoURL });

    return user;
  } catch (error) {
    console.error(`Error creating user: ${error}`);
    useAuthStore.setState({ error: error.message || "Failed to create user!" });
    throw error;
  } finally {
    useAuthStore.setState({ authLoading: false });
  }
};

/**
 * Updates user display strings and avatar URLs directly on the authenticated session.
 * @param {Object} info - Parameters containing updated details (displayName, photoURL)
 */
export const updateUserProfile = async (info) => {
  if (!auth.currentUser) return;
  useAuthStore.setState({ authLoading: true, error: null });

  try {
    await updateProfile(auth.currentUser, info);

    /**
     * ⚡ PERFORMANCE OPTIMIZATION (Optimistic Update):
     * Force-inject updates straight into our state immediately instead of waiting for
     * Firebase's stream loop to complete. This ensures the client UI reflects changes instantly.
     */
    useAuthStore.setState((state) => ({
      user: state.user ? { ...state.user, ...info } : null,
    }));
  } catch (error) {
    console.error(`Error updating user profile: ${error}`);
    useAuthStore.setState({
      error: error.message || "Failed to update profile!",
    });
    throw error;
  } finally {
    useAuthStore.setState({ authLoading: false });
  }
};

/**
 * Terminates the user session and handles state cleaning side effects.
 */
export const logoutUser = async () => {
  useAuthStore.setState({ authLoading: true, error: null });

  try {
    await signOut(auth);
  } catch (error) {
    console.error(`Error logging out: ${error}`);
    useAuthStore.setState({ error: error.message || "Failed to logout!" });
    throw error;
  } finally {
    useAuthStore.setState({ authLoading: false });
  }
};

export default useAuthStore;
