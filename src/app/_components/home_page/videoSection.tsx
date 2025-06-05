"use client"

const VideoSection = () => {
  return (
    <section className="flex items-center justify-center w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          <div className="relative w-full overflow-hidden rounded-xl aspect-video">
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/demo_2.mp4"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;