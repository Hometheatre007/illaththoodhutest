// React Compiler Runtime Mock for React 18 compatibility
// Sanity v3.99+ uses React Compiler internally which requires React 19's compiler-runtime.
// This shim provides the 'c' function (cache hook) for React 18.

function c(size) {
  // Return a fresh array cache. In React 19, this would use a built-in cache.
  // For React 18, we simply return a new array each time.
  return new Array(size).fill(undefined);
}

module.exports = { c };
