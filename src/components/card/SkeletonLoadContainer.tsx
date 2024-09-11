import { SkeletonCard } from "./SkeletonCard"


export const SkeletonLoadContainer = ({count}: {count: number}) => {
    return (
      <div className="row gap-1">
        {Array.from({ length: count }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  };