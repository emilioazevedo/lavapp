import React from 'react';
import ChartComponent from './ChartComponent';
import NewsFeed from './NewsFeed';
import VideoPlayer from './VideoPlayer';
import Settings from './Settings';

function Dashboard() {
  return (
    <div className="flex flex-col h-screen overflow-y-auto"> 
      <ChartComponent />
      <NewsFeed /> 
      <VideoPlayer />
      <Settings />
    </div>
  );
}

export default Dashboard;