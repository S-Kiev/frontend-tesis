import html2canvas from 'html2canvas';

export const generateBlob = async (id: string, dimensions = { width: 300, height: 300 }) => {
  const element = document.getElementById(id);
  return new Promise<{ name: string; dimensions: { width: number; height: number }; blob: Blob | null; error?: any }>(
    async (resolve, reject) => {
      if (element) {
        dimensions = { width: element?.clientWidth, height: element?.clientHeight };
        try {
          const canvas = await html2canvas(element, {
            backgroundColor: null,
            scale: 2,
            width: dimensions.width,
            height: dimensions.height,
          });
          canvas.toBlob(blob => {
            resolve({ name: id, dimensions, blob });
          });
        } catch (error) {
          reject({ error: error });
        }
      } else {
        reject(new Error(`No element found with id: ${id}`));
      }
    },
  );
};
