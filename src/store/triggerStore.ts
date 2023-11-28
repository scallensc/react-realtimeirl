import { observable } from "@legendapp/state";

const triggerStore = observable({
  rotator: { show: false },
  neighbourhood: { show: false },
});

/*eslint no-constant-condition: ["error", { "checkLoops": false }]*/
(async () => {
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 20000));
    triggerStore.neighbourhood.show.set(true);
    await new Promise(resolve => setTimeout(resolve, 40000));
    triggerStore.neighbourhood.show.set(false);
  }
})();

(async () => {
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 40000));
    triggerStore.rotator.show.set(true);
    await new Promise(resolve => setTimeout(resolve, 20000));
    triggerStore.rotator.show.set(false);
  }
})();

export default triggerStore;

