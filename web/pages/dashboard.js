import { SoloLogo } from "@/assets/solologo";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="flex flex-col h-screen">
      {/* background color */}
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

      {/* background color */}
      <div className="bg-gray-100 flex-grow">
        {/* start of main area */}
        <div className="container mx-auto grid grid-cols-4 grid-rows-1 gap-2">
          <div className="mt-4 flex flex-col items-center border-[1px] rounded-lg bg-white">
            <div className="font-bold text-lg w-11/12 mt-2">
              <h1>Records</h1>
            </div>
            <button className="my-2 btn btn-sm font-thin rounded-full h-[32px] w-11/12 bg-blue-700 text-slate-50">
              + ADD
            </button>
          </div>
          <div className="mt-4 col-span-3">
            <div>HELLO</div>
            <div>
              <span>Here are the transactions \/</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
