import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return <SignIn forceRedirectUrl="/onboarding" signUpUrl="/sign-up" />;
}
