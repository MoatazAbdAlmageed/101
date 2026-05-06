let level; // Type is 'any'
level = 1;
level = "Easy"; // No error, but dangerous!

function render(document: any) {
  console.log(document);
}