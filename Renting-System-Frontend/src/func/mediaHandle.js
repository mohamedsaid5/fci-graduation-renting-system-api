export function mediaHandle(file) {
	let file_ext = '';
	let file_type = file.type;
	let file_name = file.name;

	file_ext = file_name.toLowerCase();
	file_ext = file_ext.substring((file_ext.lastIndexOf(".") + 1), (file_ext.length - file_ext.lastIndexOf(".")));

	file_type = file_type.toLowerCase();
	file_type = file_type.substring(0, file_type.indexOf("/"));

	return { file: URL.createObjectURL(file), file_type: file_type };
}