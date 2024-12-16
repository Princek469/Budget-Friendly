import { useRef, useState } from "react";
import { checkValidateData } from "../utils/validate";
import { auth, db } from "../utils/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Login() {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null); // Add success message state
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    async function handleSignForm(e) {
        e.preventDefault(); // Prevent form submission

        setErrorMessage(null); // Clear any previous errors
        setSuccessMessage(null); // Clear success message

        const message = checkValidateData(email.current.value, password.current.value);
        setErrorMessage(message);
        if (message) return; // Exit if there's a validation error

        try {
            if (!isSignInForm) {
                // SIGN-UP LOGIC
                const userCredential = await createUserWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );
                const user = userCredential.user;

                // Update profile and create Firestore document with empty expenses
                await updateProfile(user, { displayName: name.current.value });
                await setDoc(doc(db, "users", user.uid), {
                    name: name.current.value,
                    email: email.current.value,
                    expenses: [], // Initialize with empty array
                });

                // setSuccessMessage("Successfully signed up! Please sign in.");
                alert("Successfully signed up! Please sign in.")
                resetFormFields(); // Reset fields
                setIsSignInForm(true); // Switch to Sign-In form
            } else {
                // SIGN-IN LOGIC
                const userCredential = await signInWithEmailAndPassword(
                    auth,
                    email.current.value,
                    password.current.value
                );
                const user = userCredential.user;

                // Fetch user's expense data from Firestore
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    navigate("/expense", { state: { userData, uid: user.uid } });
                } else {
                    setErrorMessage("User data not found. Please sign up first.");
                }
            }
        } catch (error) {
            setErrorMessage(`${error.code}: ${error.message}`);
        }
    }

    // Function to reset form fields
    function resetFormFields() {
        if (name.current) name.current.value = "";
        if (email.current) email.current.value = "";
        if (password.current) password.current.value = "";
    }

    function toggleSignInForm() {
        setIsSignInForm(!isSignInForm);
        setErrorMessage(null); // Reset error message
        setSuccessMessage(null); // Reset success message
        resetFormFields(); // Reset form fields
    }

    return (
        <div className="">
            <h1 className="text-6xl text-red-400 my-5 text-center font-extrabold">Budget Buddy</h1>
            <form
                className="w-[380px] absolute px-9 py-4 bg-black my-14 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
                onSubmit={handleSignForm}
            >
                <h2 className="text-3xl text-white font-bold py-4 px-[3px]">
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </h2>

                {/* Success message */}
                {successMessage && (
                    <p className="text-green-400 text-lg font-bold px-[2px]">{successMessage}</p>
                )}

                {/* Name input for Sign-Up */}
                {!isSignInForm && (
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        className="p-4 my-4 w-full outline-none bg-gray-700"
                        ref={name}
                    />
                )}
                {/* Email input */}
                <input
                    type="email"
                    placeholder="Email Address"
                    className="p-4 my-4 w-full outline-none bg-gray-700"
                    ref={email}
                />
                {/* Password input */}
                <input
                    type="password"
                    placeholder="Enter Password"
                    className="p-4 my-4 w-full outline-none bg-gray-700"
                    ref={password}
                />
                {/* Error message */}
                <p className="text-red-400 text-lg font-bold px-[2px]">{errorMessage}</p>
                <button
                    className="w-full font-bold text-xl p-2 my-6 bg-red-600"
                    type="submit"
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p
                    className="py-2 cursor-pointer text-center font-semibold"
                    onClick={toggleSignInForm}
                >
                    {isSignInForm
                        ? "New to Budget Buddy? Sign Up Now"
                        : "Already Registered? Sign In Now"}
                </p>
            </form>
        </div>
    );
}

export default Login;