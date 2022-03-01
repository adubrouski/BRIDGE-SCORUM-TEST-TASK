export function convertImageURLToBase64(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.onload = () => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(new Error("Внутренняя ошибка"));
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.onerror = () => {
      reject(new Error("Внутренняя ошибка"));
    };
    xhr.open("GET", url);
    xhr.responseType = "blob";
    xhr.send();
  });
}
