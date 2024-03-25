import { TbLoader3 } from "react-icons/tb";

export default function Loader() {
  return (
    <div className="flex mt-8 justify-center items-center">
      <TbLoader3 className="animate-spin" size={80} />
      <h3 className="text-gray-500 animate-pulse font-title">Please wait...</h3>
    </div>
  );
}
