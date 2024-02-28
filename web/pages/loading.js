import { GeldLogo } from "@/assets/logo";

export default function Loading() {
  return (
    <main className="h-screen w-screen flex flex-col justify-center items-center">
      <GeldLogo />
      <div className="flex gap-3">
        <span className="loading loading-spinner loading-xs"></span>
        <span className="loading loading-ring loading-lg"></span>
        <span className="loading loading-spinner loading-xs"></span>
      </div>
    </main>
  );
}
