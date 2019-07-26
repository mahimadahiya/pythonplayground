export const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", { color: [] }, { font: [] }],
    [
      { list: "ordered" },
      { list: "bullet" },
      { align: [] },
      { indent: "-1" },
      { indent: "+1" }
    ],
    ["link", "image"],
    ["clean"]
  ]
};

export const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "font",
  "list",
  "bullet",
  "align",
  "indent",
  "link",
  "image"
];
