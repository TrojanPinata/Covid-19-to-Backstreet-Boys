function walk(rootNode)
{
    // This is a reconfiguration of the Millenials to Snake People Extension. Please support Eric's extension as he seems like a really cool guy. https://github.com/ericwbailey/millennials-to-snake-people. I'm fucking shit with javascript so my edits will be gross

    // Find all the text nodes in rootNode
    var walker = document.createTreeWalker(
        rootNode,
        NodeFilter.SHOW_TEXT,
        null,
        false
    ),
    node;

    // Modify each text node's value
    while (node = walker.nextNode()) {
        handleText(node);
    }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);
}

function replaceText(v)
{
    // This is where our replacements go

    // ooga booga
    v = v.replace(/\b(C|c)ovid-19\b/g, "Backstreet Boys Reunion Tour");
    v = v.replace(/\bCOVID-19\b/g, "Backstreet Boys Reunion Tour");
    v = v.replace(/\bCoronavirus\b/g, "Backstreet Boys Reunion Tour");
    v = v.replace(/\bWHO\b/g, "The Backstreet Boys Tour Management Team");
    v = v.replace(/\bWorld Health Organization\b/g, "Backstreet Boys Tour Management Team");
    v = v.replace(/\brecover(ed|ing) from\b/g, "listened to Backstreet's Back after");
    v = v.replace(/\bCases\b/g, "Tickets");
    v = v.replace(/\bcases\b/g, "tickets");
    v = v.replace(/\bcovid\b/g, "Backstreet Boys Reunion Tour");
    v = v.replace(/\bDisease\b/g, "Concert");
    v = v.replace(/\bdisease\b/g, "concert");
    v = v.replace(/\bPatients\b/g, "Concert goers");
    v = v.replace(/\bpatients\b/g, "concert goers");
    v = v.replace(/\b(S|s)ocial (D|d)istancing\b/g, "Listening to the boys");
    v = v.replace(/\bcoronavirus\b/g, "Backstreet Boys Reunion Tour");
    v = v.replace(/\bSARS-CoV-2\b/g, "Boy Band Fever");
    v = v.replace(/\billness\b/g, "concert");
    v = v.replace(/\bvirus\b/g, "concert");
    v = v.replace(/\bIllness\b/g, "Concert");
    v = v.replace(/\bVirus\b/g, "Concert");
    v = v.replace(/\bCOVID\b/g, "Backstreet Boys Reunion Tour");
    v = v.replace(/\b(CDC|cdc)\b/g, "Backstreet Tours");
    v = v.replace(/\b#COVID-19\b/g, "#BBRT");

return v;
}
// Returns true if a node should *not* be altered in any way
function isForbiddenNode(node) {
    return node.isContentEditable || // DraftJS and many others
    (node.parentNode && node.parentNode.isContentEditable) || // Special case for Gmail
    (node.tagName && (node.tagName.toLowerCase() == "textarea" || // Some catch-alls
                     node.tagName.toLowerCase() == "input"));
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
    var i, node;

    mutations.forEach(function(mutation) {
        for (i = 0; i < mutation.addedNodes.length; i++) {
            node = mutation.addedNodes[i];
            if (isForbiddenNode(node)) {
                // Should never operate on user-editable content
                continue;
            } else if (node.nodeType === 3) {
                // Replace the text for text nodes
                handleText(node);
            } else {
                // Otherwise, find text nodes within the given node and replace text
                walk(node);
            }
        }
    });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
    var docTitle = doc.getElementsByTagName('title')[0],
    observerConfig = {
        characterData: true,
        childList: true,
        subtree: true
    },
    bodyObserver, titleObserver;

    // Do the initial text replacements in the document body and title
    walk(doc.body);
    doc.title = replaceText(doc.title);

    // Observe the body so that we replace text in any added/modified nodes
    bodyObserver = new MutationObserver(observerCallback);
    bodyObserver.observe(doc.body, observerConfig);

    // Observe the title so we can handle any modifications there
    if (docTitle) {
        titleObserver = new MutationObserver(observerCallback);
        titleObserver.observe(docTitle, observerConfig);
    }
}
walkAndObserve(document);