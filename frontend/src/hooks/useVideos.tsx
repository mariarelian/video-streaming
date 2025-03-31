import { useEffect, useRef, useState } from "react";

interface Video {
  id: number;
  title: string;
  thumbnail: string;
}

interface APIResponse {
  products: Video[];
  limit: number;
  skip: number;
  total: number;
}

const getInitialLimit = (): number => {
  const screenHeight = window.innerHeight;
  const cardHeight = 250;

  return Math.ceil(screenHeight / cardHeight) * 2;
};

const useVideos = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const limit = useRef(getInitialLimit());
  const [skip, setSkip] = useState(0);
  const [videos, setVideos] = useState<Video[]>([]);
  const loaderRef = useRef<HTMLDivElement | null>(null); // reference the div element for the observer

  useEffect(() => {
    const fetchVideos = async (): Promise<void> => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products?limit=${limit.current}&skip=${skip}&select=title,thumbnail` // using dummyjson for fake data
        );
        if (!response.ok) throw new Error("Failed to fetch videos");
        const data: APIResponse = await response.json();

        setVideos((prev) => [...prev, ...data.products]);
      } catch (e) {
        setError(true);
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [skip]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && !error) {
          setSkip((prev) => prev + limit.current); //initiate load of next page of videos when user scrolls to the bottom
        }
      },
      { root: null, rootMargin: "100px", threshold: 0 }
    );

    const target = loaderRef.current;
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, [loading, error]);

  return {
    videos,
    loading,
    error,
    limit,
    containerRef: loaderRef,
  };
};

export default useVideos;
