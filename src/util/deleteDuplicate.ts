export const deleteDuplicate = (arr: any[], clave: string): any[] => {
  const uniqueMap = new Map();
  for (const obj of arr) {
    const value = obj[clave];
    uniqueMap.set(value, obj);
  }
  return Array.from(uniqueMap?.values());
};
