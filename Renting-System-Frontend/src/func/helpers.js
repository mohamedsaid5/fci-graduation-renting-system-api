export * from "./mediaHandle";
export * from "./formatNumber";
export * from "./get";
export * from "./post";

export const apiStore = {
	_data: new Map(),
	get(key) {
		if (!key) return 0;
		return this._data.get(key) || 0
	},
	set(key, data) {
		if (!key) return;
		return this._data.set(key, data);
	}
};

export function objectToFormData(obj) {
	const formData = new FormData();

	for (const key in obj) {
		formData.append(key, obj[key]);
	}

	return formData;
}

export function imageLoadingHandler(image, src, onErrorSrc) {
	const placeholder = new Image();
	placeholder.src = src;
	console.log('start loading')

	placeholder.onload = function () {
		image.src = src;
		console.log('loaded')
	};

	placeholder.onerror = function () {
		console.error("Failed to load the image.");
		if(onErrorSrc) image.src = onErrorSrc
	};
}