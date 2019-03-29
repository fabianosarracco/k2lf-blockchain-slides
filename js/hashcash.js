function hcChangeSpeed(idx) {
    const domSpeeds = [document.getElementById('hashcashspeed1'), 
                       document.getElementById('hashcashspeed2'),
                       document.getElementById('hashcashspeed4'),
                       document.getElementById('hashcashspeed8')];
    domSpeeds.forEach((dom) => {
        dom.classList.remove('selected');
    });
    domSpeeds[idx].classList.add('selected');
}

function hcGetSpeed() {
    if (document.getElementById('hashcashspeed1').classList.contains('selected')) return 1;
    if (document.getElementById('hashcashspeed2').classList.contains('selected')) return 2;
    if (document.getElementById('hashcashspeed4').classList.contains('selected')) return 4;
    if (document.getElementById('hashcashspeed8').classList.contains('selected')) return 8;
}

function hcCheckNonce(hash, difficulty) {
    for (let i = 0; i < difficulty; i++) {
        if (hash.charAt(i) !== '0') return false;
    }
    return true;
}

function hcSearchNonce() {
    const domRecipient = document.getElementById('mailrecipient');
    const domContent = document.getElementById('mailcontent');
    const domDifficulty = document.getElementById('hashcashdiff');
    const domNonce = document.getElementById('mailnonce');
    const domHashoutput = document.getElementById('hashoutput');
    const timeout = 200;
    const recipient = domRecipient.value;
    const content = domContent.value;
    const difficulty = domDifficulty.value;

    const testNonce = (nonce) => {
        domNonce.value = nonce;
        let tent = recipient + content + nonce;
        let hash = SHA256(tent);
        domHashoutput.innerText = hash.substring(0, 30) + "...";
        let nonceFound = hcCheckNonce(hash, difficulty);
        if (!nonceFound) setTimeout(() => testNonce(nonce + 1), timeout / hcGetSpeed());
    }

    testNonce(0);
    return false;
}
