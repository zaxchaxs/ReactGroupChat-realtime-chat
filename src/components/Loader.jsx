export default function Loader({onMessage}) {
	return (
		<>
		<div className={`flex items-center w-full justify-center ${onMessage ? "h-full" : "h-screen"} z-20`}>
			<div className="w-40 loader"></div>
		</div>
		</>
	);
}