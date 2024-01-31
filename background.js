function copyToClipboard(text) {
    const input = document.createElement('textarea');
    document.body.appendChild(input);
    input.value = text;
    input.focus();
    input.select();
    document.execCommand('Copy');
    input.remove();
}

browser.browserAction.onClicked.addListener((tab) => {
    // Check if the current tab's URL is a Reddit page
    if (tab.url.includes('reddit.com')) {
        // Modify the URL to get the JSON representation
        const jsonUrl = tab.url.split('?')[0] + '.json';

        fetch(jsonUrl)
            .then(response => response.json())
            .then(data => {
                const fallback_url = data[0].data.children[0].data.secure_media.reddit_video.fallback_url;
                if (fallback_url) {
                    copyToClipboard(fallback_url);
                    console.log('Direct video URL copied to clipboard!');
                } else {
                    console.log('No direct video URL found on this page.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        console.log('Not a Reddit page.');
    }
});
