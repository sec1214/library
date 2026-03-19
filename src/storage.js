export const saveLibrary = (data) => {
  localStorage.setItem("myLibrary", JSON.stringify(data));
};

export const loadLibrary = () => {
  const data = localStorage.getItem("myLibrary");
  return data ? JSON.parse(data) : [];
};
