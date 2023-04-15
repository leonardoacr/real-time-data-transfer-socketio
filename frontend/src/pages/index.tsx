import Graph from "@/components/Graph";
import { IGraphData } from "@/types/graphData";
import { ArrowUpDown, Radio } from "lucide-react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

export default function Home() {
  const [connectivity, setConnectivity] = useState<string>("NOT CONNECTED");
  const [data, setData] = useState<number>(10);
  const [acc, setAcc] = useState<number>(0);
  const [graphData, setGraphData] = useState<IGraphData>({
    x: [],
    y: [],
  });

  useEffect(() => {
    const socket = io("http://localhost:8000");

    socket.on("connect", () => {
      console.log("Socket.IO connected");
      setConnectivity("STABLE");
    });

    socket.on("randomData", (data: any) => {
      const randomNumber = parseInt(data.randomNumber);
      setData(randomNumber);

      // Update graph data
      setGraphData((prevData: IGraphData) => {
        const newX = [...prevData.x, acc];
        const newY = [...prevData.y, randomNumber];
        setAcc((prevAcc) => prevAcc + 1); // Update acc by incrementing its previous value by 1
        return { x: newX, y: newY };
      });
    });

    return () => {
      socket.close();
    };
  }, [acc]);

  return (
    <div className="flex justify-center items-center ">
      <div className="grid grid-cols-1 w-screen">
        <h1 className="text-center lg:text-7xl sm:text-lg text-zinc-100 py-10">
          WEBSOCKET
        </h1>
        <div className="flex justify-center">
          <div className="rounded border border-slate-600 p-10 shadow-lg shadow-purple-900">
            <h1 className="flex items-center justify-center text-center lg:text-5xl sm:text-base">
              CONNECTION
              <Radio className="pl-2 text-sky-500" width={50} height={50} />
            </h1>
            <h2 className="text-center lg:text-2xl sm:text-base text-green-600">
              {connectivity}
            </h2>
            <div className="flex justify-center items-center pt-10">
              <h1 className="text-center lg:text-5xl md:text-base">DATA</h1>
              <ArrowUpDown
                className="pl-2 text-sky-500"
                width={50}
                height={50}
              />
            </div>
            <h2 className="text-center text-2xl text-purple-600">{data}</h2>
          </div>
        </div>
        <div className="w-screen flex justify-center  h-screen ">
          <div className="w-10/12 pt-10 h-1/2 items-center">
            <Graph graphData={graphData} />
          </div>
        </div>
      </div>
    </div>
  );
}
