export const ErrorMassage = ({ error }: { error?: string }) => {
    return <p className="text-red-500 text-sm">{error}</p>;
};