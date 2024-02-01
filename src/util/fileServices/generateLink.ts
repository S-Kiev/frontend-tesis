export const generateLink = (url, fileName, fileExtension) => {
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}.${fileExtension}`);
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};
