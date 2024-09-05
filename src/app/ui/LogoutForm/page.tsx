import { signOut } from "@/auth";

export function LogoutForm() {
  return (
    <div>
      <h5>Are you sure you want to sign out?</h5>
      <form
        action={async (formData) => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button type="submit">Sign out</button>
      </form>
    </div>
  );
}
