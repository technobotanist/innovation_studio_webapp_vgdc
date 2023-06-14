// Use dynamic import to import the cpy package
const cpyPromise = import('cpy');

// Copy the 'assets' folder to the 'dist' folder
cpyPromise.then((cpy) => {
  cpy.default('cpy_src/**/*', 'dist');
});
