import React from "react";

const Page = () => {
  return (
    <div className="container mx-auto my-16 p-6 bg-white">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-600">
        Learn Finance
      </h1>
      <p className="mt-4 text-gray-600">
        Welcome to the Learn Finance section. Here you can find resources and
        discussions to enhance your financial knowledge.
      </p>

      {/* Video Grid */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <iframe
          className="w-full aspect-video rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/videoseries?si=VxfWbUsN2tPq9qC-&amp;list=PL9ECA8AEB409B3E4F"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <iframe
          className="w-full aspect-video rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/t4zfiBw0hwM?si=n4LwlBoU2P6vBGuu"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>

        <iframe
          className="w-full aspect-video rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/ks33lMoxst0?si=kT7-iBhgqFiXeUZF"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <iframe
          className="w-full aspect-video rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/DNYCgsyOAW4?si=5C2eP3ifaTh3TC9d"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <iframe
          className="w-full aspect-video rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/Fi_kMc6hLxI?si=vi_MldV-zS6AYZLH"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <iframe
          className="w-full aspect-video rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/L837QfEf1Nc?si=MrI6a1xvyCgl9cdf"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <iframe
          className="w-full aspect-video rounded-lg shadow-lg"
          src="https://www.youtube.com/embed/y3WLhOOIsfE?si=AAR-Qakr22_pcLR4"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Page;
