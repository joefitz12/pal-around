import { signIn } from "@/auth";

export function LoginForm() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github", { redirectTo: "/crews" });
      }}
    >
      <button type="submit">Signin with GitHub</button>
    </form>
  );
}
