import VideoList from "./_components/videoList"

function Dashboard() {
  
  return (
    <div className="h-full">
      <h2 className="font-bold text-3xl">
        My Videos
      </h2>
      <VideoList/>
    </div>
  )
}

export default Dashboard