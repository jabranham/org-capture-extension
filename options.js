// Saves options to chrome.storage.sync.
function save_options() {
    var selTemp = document.getElementById('selTemplate').value;
    var unselTemp = document.getElementById('unselTemplate').value;
    var NewStyleP = document.getElementById('useNewStyle').checked;
    var debugP = document.getElementById('debug').checked;
    var overlayP = document.getElementById('overlay').checked;

    chrome.storage.sync.set({
        selectedTemplate: selTemp,
        unselectedTemplate: unselTemp,
        useNewStyleLinks: NewStyleP,
        debug: debugP,
        overlay: overlayP
    }, function() {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
    // Use default value color = 'red' and likesColor = true.
    chrome.storage.sync.get({
        selectedTemplate: 'p',
        unselectedTemplate: 'L',
        useNewStyleLinks: true,
        debug: false,
        overlay: true
    }, function(options) {
        document.getElementById('unselTemplate').value = options.unselectedTemplate;
        document.getElementById('selTemplate').value = options.selectedTemplate;
        document.getElementById('useNewStyle').checked = options.useNewStyleLinks;
        document.getElementById('debug').checked = options.debug;
        document.getElementById('overlay').checked = options.overlay;
    });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
                                                 save_options);
