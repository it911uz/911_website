export const ErrorMassage = ({ error }: Props) => {

	return error ? (
		<p className="text-red-500 text-sm mt-1 font-medium animate__animated animate__fadeInDown">
			{error}
		</p>
	) : null
};

interface Props {
	error?: string;
}
