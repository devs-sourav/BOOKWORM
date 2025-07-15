export const Container = ({ className = "", children }) => {
  return (
    <div className={`max-w-[1340px] mx-auto ${className}`}>
      {children}
    </div>
  );
};
