import Data from "@/components/Data";
import { ArrowUpDown, Radio } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [connectivity, setConnectivity] = useState<string>("");

  useEffect(() => {
    setConnectivity("STABLE");
  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="block">
        <h1 className="text-center text-7xl text-zinc-100 py-10">WEBSOCKET</h1>
        <div className="h-full rounded border border-slate-600 p-10">
          <h1 className="flex text-center text-5xl">
            CONNECTION
            <Radio className="pl-2 text-sky-500" width={50} height={50} />
          </h1>
          <h2 className="text-center text-2xl text-green-600">
            {connectivity}
          </h2>
          <div className="w-full flex justify-center items-center pt-10">
            <h1 className="text-center text-5xl">DATA</h1>
            <ArrowUpDown className="pl-2 text-sky-500" width={50} height={50} />
          </div>
          <h2 className="text-center text-2xl text-purple-600">
            <Data />
          </h2>
        </div>
      </div>
    </div>
  );
}
