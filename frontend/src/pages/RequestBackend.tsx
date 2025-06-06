import { Button } from "@/components/ui/button";
import API from "@/lib/axios";
import { useState } from "react";
const RequestBackend = () => {
  const [res, setRes] = useState("");
  const RequestBackend = async () => {
    try {
      const res = await API.get("/admin/dashboard");
      console.log("request sent");
      console.log(res.data);
      setRes(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col gap-y-4 justify-center items-center bg-zinc-900">
      <h1>RequestBackend</h1>
      <Button
        variant={"secondary"}
        size={"lg"}
        onClick={() => {
          RequestBackend()
        }}
      >
        Request
      </Button>
      <div className="text-white bg-zinc-700 rounded-md p-10 w-full h-full">
        
      </div>
    </div>
  );
};

export default RequestBackend;
