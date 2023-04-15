import { ArrowUpDown, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [connectivity, setConnectivity] = useState<string>("");
  const [data, setData] = useState<number>(10);

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("Socket.IO connected");
      setConnectivity("STABLE");
    });

    socket.on("randomData", (data: any) => {
      const randomNumber = parseInt(data.randomNumber);
      console.log(`${randomNumber}`);
      setData(randomNumber);
    });

    return () => {
      socket.close();
    };
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
          <h2 className="text-center text-2xl text-purple-600">{data}</h2>
        </div>
      </div>
    </div>
  );
}
