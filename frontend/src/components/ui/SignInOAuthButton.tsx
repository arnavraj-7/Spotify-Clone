
import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./button";


const SignInOAuthButton = () => {
    const { signIn } = useSignIn();
  const SignInwithGoogle = () => {
    signIn?.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };
  return (
    <div>
        <Button variant={"secondary"} onClick={SignInwithGoogle} className="w-full text-white border-zinc-200 h-11">
            Continue with Google
        </Button>
    </div>
  );
};

export default SignInOAuthButton;
