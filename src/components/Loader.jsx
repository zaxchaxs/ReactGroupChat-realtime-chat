/* eslint-disable react/prop-types */
export default function Loader({onMessage, isSmallLoad}) {
	return (
		<>
		<div className={`flex items-center ${isSmallLoad ? "w-6" : "w-full"} w-6 justify-center ${onMessage ? "h-full" : `${isSmallLoad ? "" : "h-screen"}`} z-20`}>
			<div className="w-40 loader"></div>
		</div>
		</>
	);
}