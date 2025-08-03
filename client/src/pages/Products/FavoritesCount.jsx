import { useSelector } from "react-redux";

const FavoritesCount = () => {
  const favorites = useSelector((state) => state.favorites);
  const favoriteCount = favorites.length;

  return (
    <div className="absolute -top-1 right-1">
      {favoriteCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full text-xs px-2 py-0.5 font-bold min-w-[20px] text-center shadow-lg animate-bounce">
          {favoriteCount}
        </span>
      )}
    </div>
  );
};

export default FavoritesCount;
