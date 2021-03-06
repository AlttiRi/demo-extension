import {ref, readonly} from "../../libs/vue-reactivity.js";
import {getFromStoreLocal, setToStoreLocal} from "../../util-ext.js";

/** @type {import("@vue/reactivity").Ref<boolean>} */
export const isBOMReady = ref(false);
let resolve;
/** @type {Promise} */
export const onBOMReady = new Promise(_resolve => resolve = _resolve);
/** @type {import("@vue/reactivity").Ref<boolean|null>} */
const bookmarkOpenerMode = ref(null);

async function init() {
    /** @type {boolean|undefined} */
    let bom = await getFromStoreLocal("bookmarkOpenerMode");
    if (bom === undefined) {
        await setToStoreLocal("bookmarkOpenerMode", false);
        bom = false;
    }
    bookmarkOpenerMode.value = bom;
    isBOMReady.value = true;
    resolve();
}
void init();

const bom = readonly(bookmarkOpenerMode);
export {bom as bookmarkOpenerMode};

export async function setBookmarkOpenerMode(newValue, isSync = false) {
    if (newValue === bookmarkOpenerMode.value) {
        return;
    }
    if (isSync) {
        bookmarkOpenerMode.value = newValue;
        return;
    }
    await setToStoreLocal("bookmarkOpenerMode", newValue);
    bookmarkOpenerMode.value = newValue;
    chrome.runtime.sendMessage({
        command: "set-bookmark-opener-mode--message",
        data: newValue
    });
}

chrome.runtime.onMessage.addListener(message => {
    if (message.command === "set-bookmark-opener-mode--message") {
        void setBookmarkOpenerMode(message.data, true);
    }
});
