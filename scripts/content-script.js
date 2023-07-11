let searchResultLinks = [];
let currentIndex = -1;
let index = -1;

function getSearchResultLinks() {
    searchResultLinks = [];

    // Get all links from search results and filter links from related questions
    const searchResultElements = Array.from(document.querySelectorAll('.yuRUbf > a, .DhN8Cf > a, a.l'))
        .filter(e => {
            return !isRelatedQuestionLink(e)
        })

    // Loop through the links in the search results and add the href attribute to the array
    for (let i = 0; i < searchResultElements.length; i++) {
        let searchResultLink = searchResultElements[i].href;
        searchResultLinks.push(searchResultLink);
    }
}

function scrollToElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function applyHighlight(element) {
    element.style.color = '#f74a4a';
}

function removeHighlight(element) {
    element.style.color = ''// original -> '#8AB4F8'; 
}

function isRelatedQuestionLink(linkElement) {
    // Check if the link is in the "Related Questions" section
    let relatedQuestionsContainer = linkElement.closest('.related-question-pair');
    return relatedQuestionsContainer !== null;
}

function handleKeyDown(event) {
    if (event.key === '1') {
        event.preventDefault();
        let previousIndex = currentIndex;
        currentIndex = (currentIndex + 1) % searchResultLinks.length;
        let previousLinkElement = document.querySelector('.yuRUbf > a[href="' + searchResultLinks[previousIndex] + '"]') ||
            document.querySelector('.DhN8Cf > a[href="' + searchResultLinks[previousIndex] + '"]') ||
            document.querySelector('a.l[href="' + searchResultLinks[previousIndex] + '"]');
        let currentLinkElement = document.querySelector('.yuRUbf > a[href="' + searchResultLinks[currentIndex] + '"]') ||
            document.querySelector('.DhN8Cf > a[href="' + searchResultLinks[currentIndex] + '"]') ||
            document.querySelector('a.l[href="' + searchResultLinks[currentIndex] + '"]');


        if (previousLinkElement) {
            removeHighlight(previousLinkElement);
        }

        applyHighlight(currentLinkElement);
        scrollToElement(currentLinkElement);



    } else if (event.key === '2') {
        event.preventDefault();
        let previousIndex = currentIndex;
        currentIndex = (currentIndex - 1 + searchResultLinks.length) % searchResultLinks.length;
        let previousLinkElement = document.querySelector('.yuRUbf > a[href="' + searchResultLinks[previousIndex] + '"]') ||
            document.querySelector('.DhN8Cf > a[href="' + searchResultLinks[previousIndex] + '"]') ||
            document.querySelector('a.l[href="' + searchResultLinks[previousIndex] + '"]');
        let currentLinkElement = document.querySelector('.yuRUbf > a[href="' + searchResultLinks[currentIndex] + '"]') ||
            document.querySelector('.DhN8Cf > a[href="' + searchResultLinks[currentIndex] + '"]') ||
            document.querySelector('a.l[href="' + searchResultLinks[currentIndex] + '"]');

        if (previousLinkElement) {
            removeHighlight(previousLinkElement);
        }

        applyHighlight(currentLinkElement);
        scrollToElement(currentLinkElement);



    } else if (event.key === 'º') {
        event.preventDefault();
        let linkElement = document.querySelector('.yuRUbf > a[href="' + searchResultLinks[currentIndex] + '"]') ||
            document.querySelector('.DhN8Cf > a[href="' + searchResultLinks[currentIndex] + '"]') ||
            document.querySelector('a.l[href="' + searchResultLinks[currentIndex] + '"]');

        if (linkElement) {
            window.open(linkElement.href, '_blank');
        }
    }
}

// Listen keyboard buttons "1", "2" y "º"
document.addEventListener('keydown', handleKeyDown);

// Call the function to get the links from the search results
getSearchResultLinks();