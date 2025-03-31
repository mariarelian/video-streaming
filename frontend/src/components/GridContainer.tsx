import useVideos from "../hooks/useVideos";

const GridContainer: React.FC = () => {
  const { loading, error, videos, containerRef } = useVideos();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading videos</div>;

  return (
    <div className="w-full px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <div
          key={video.id}
          className="bg-white rounded shadow hover:shadow-md transition cursor-pointer"
        >
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-auto"
          />
          <h2 className="text-sm font-semibold">{video.title}</h2>
        </div>
      ))}
      <div ref={containerRef}></div>
    </div>
  );
};

export default GridContainer;
