// Use dynamic import to import the cpy package
const cpyPromise = import('cpy');

// Copy the contents of the 'cpy_src' folder to the 'dist' folder
cpyPromise.then((cpy) => {
  cpy.default('cpy_src/**/*', 'dist');
});
