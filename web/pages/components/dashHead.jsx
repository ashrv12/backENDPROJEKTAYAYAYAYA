import { SoloLogo } from "@/assets/solologo";
import Link from "next/link";

export function DashHead() {
  return (
    <div>
      <main className="container mx-auto">
        {/* navbar */}
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center gap-x-5">
            <SoloLogo />
            <Link className="text-lg" href="#">
              Dashboard
            </Link>
            <Link className="text-lg font-bold" href="#">
              Records
            </Link>
          </div>
          <div className="flex items-center gap-x-5">
            <button className="btn btn-sm font-thin rounded-full h-[32px] w-[100px] bg-blue-700 text-slate-50">
              + Record
            </button>
            <img src="/klee.png" className="h-[40px] w-[40px] rounded-full" />
          </div>
        </div>
      </main>
    </div>
  );
}
