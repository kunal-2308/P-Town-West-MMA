const AdminHome = () => {
  // Example data for mapping
  const data1 = ["Box 1", "Box 2", "Box 3"];
  const data2 = ["Box 4", "Box 5", "Box 6"];

  return (
    <div className="p-4 space-y-8">
      {/* First Container */}
      <div className="border-2 border-neutral-400 rounded-3xl p-8">
        <h2 className="text-xl font-bold mb-4">Upcoming classes</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {data1.map((item, index) => (
            <div
              key={index}
              className="border border-neutral-600 p-4 w-1/3 text-center"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center items-center">
          <button className="rounded-xl bg-blue-600 text-white p-2">
            See All
          </button>
        </div>
      </div>

      {/* Second Container */}
      <div className="border-2 border-neutral-400 rounded-3xl p-8">
        <h2 className="text-xl font-bold mb-4">Previous Classes</h2>
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {data2.map((item, index) => (
            <div
              key={index}
              className="border border-neutral-600 p-4 w-1/3 text-center"
            >
              {item}
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-center items-center">
          <button className="rounded-xl bg-blue-600 text-white p-2">
            See All
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
