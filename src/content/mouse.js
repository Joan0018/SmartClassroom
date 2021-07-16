/* 
Allow other website to has Handsfree's Mouse Function (Google Meet own will be written in content.js)
*/
const handsfree = new Handsfree({
    isClient: true,
    hands: {
        enabled: true,
        maxNumHands: 1,
        minDetectionConfidence: 0.85,
        minTrackingConfidence: 0.5
    }
})

const state = {
    handGesture: null
};

async function start() {
    await loadState();
    loadMousePointer();
}

async function loadState() {
    state.handGesture = (await browser.storage.sync.get(["handGesture"])).handGesture;
}


function loadMousePointer(){
    if (state.handGesture === 'mouse') {
        handsfree.use('pinchClick', ({ hands }) => {
            if (!hands.multiHandLandmarks) return

            handsfree.enablePlugins('browser');

            hands.pointer.forEach((pointer, hand) => {
                if (pointer.isVisible && hands.pinchState[hand][0] === 'start') {
                    const $el = document.elementFromPoint(pointer.x, pointer.y)
                    if ($el) {
                        $el.dispatchEvent(
                            new MouseEvent('click', {
                                bubbles: true,
                                cancelable: true,
                                clientX: pointer.x,
                                clientY: pointer.y
                            })
                        )

                        // Focus
                        if (['INPUT', 'TEXTAREA', 'BUTTON', 'A'].includes($el.nodeName))
                            $el.focus()
                    }
                }
            })
        })
    } else {
        handsfree.disablePlugins('browser');
    }
}

/**
 * Handle messages from background script
 */
chrome.runtime.onMessage.addListener(function (message) {
    switch (message.action) {
        case 'handsfree-data':
            handsfree.runPlugins(message.data)
            break

        case 'handsfree-debug':
            console.log(message.data)
            break
    }
})

start();
