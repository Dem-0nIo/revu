(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('react')) :
  typeof define === 'function' && define.amd ? define(['react'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.useMutationObserver = factory(global.React));
}(this, (function (react) { 'use strict';

  var config = {
      attributes: true,
      characterData: true,
      subtree: true,
      childList: true
  };
  /**
   *
   * useMutationObserver hook
   *
   * Returns a mutation observer for a React Ref and fires a callback
   *
   * @param {MutableRefObject<HTMLElement | null>} ref React ref on which mutations are to be observed
   * @param {MutationCallback} callback Function that needs to be fired on mutation
   * @param {MutationObserverInit} options
   */
  function useMutationObserver(ref, callback, options = config) {
      react.useEffect(() => {
          // Create an observer instance linked to the callback function
          if (ref.current) {
              const observer = new MutationObserver(callback);
              // Start observing the target node for configured mutations
              observer.observe(ref.current, options);
              return () => {
                  observer.disconnect();
              };
          }
      }, [callback, options]);
  }

  return useMutationObserver;

})));
//# sourceMappingURL=index.js.map
