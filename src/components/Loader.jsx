import { ClipLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className="p-4 flex justify-center items-center flex-col gap-3">
      <ClipLoader color="#3f66ef" />
      Loading ...
    </div>
  );
}
