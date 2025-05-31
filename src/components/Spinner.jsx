import ClipLoader from "react-spinners/ClipLoader";

const override = {
  display: "block",
  margin: "0 auto",
};

function Spinner({ loading }) {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-1 rounded-full inline-block">
        <div className="bg-white rounded-full p-6">
          <ClipLoader
            color="#7c3aed" // purple-600
            loading={loading}
            cssOverride={override}
            size={80}
          />
        </div>
      </div>
    </div>
  );
}

export default Spinner;
