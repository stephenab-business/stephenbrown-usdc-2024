/** 
 * RECOMMENDATION
 * 
 * To test your code, you should open "tester.html" in a web browser.
 * You can then use the "Developer Tools" to see the JavaScript console.
 * There, you will see the results unit test execution. You are welcome
 * to run the code any way you like, but this is similar to how we will
 * run your code submission.
 * 
 * The Developer Tools in Chrome are available under the "..." menu, 
 * futher hidden under the option "More Tools." In Firefox, they are 
 * under the hamburger (three horizontal lines), also hidden under "More Tools." 
 */


/**
 * Removes any illegal formatted objects from the scannedTextObj.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - JSON object without any duplicate objects or content.
 */

 function checkFormat(scannedTextObj) {
    var formattedObj = [];                                      
    if (scannedTextObj.length > 0) {
        scannedTextObj.forEach(Book => {
            /** Check that every entry in scannedTextObj has the `Title`, `ISBN`, 
             * and `Content` properties. */
            if (Book.Title && Book.ISBN && Book.Content) {
                var formattedContent = [];
                Book.Content.forEach(Line => {
                    /** Check that each scanned line in the object has the `Page`, 
                     * `Line`, and `Text` properties. If properly formatted, save
                     * it for push.
                     */
                    if (Line.Page && Line.Line && Line.Text) {
                        formattedContent.push(Line);
                    }
                });
                /** Set the current entry's `Content` property to the array of the
                 * correctly formatted lines.
                 */
                Book.Content = formattedContent;
                formattedObj.push(Book);
            }
        });
    }

    return formattedObj;
 }


/**
 * Removes duplicate array objects and scanned text from `Content` section.
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - JSON object without any duplicate objects or content.
 */

 function removeDuplicates(scannedTextObj) {
    const formattedObj = checkFormat(scannedTextObj);
    var noDupObj = [];
    if (formattedObj.length > 0) {
        /** Create two sets to store previous `ISBN`s and `Content` properties. */
        var ISBNSet = new Set();
        var contentSet = new Set();
        scannedTextObj.forEach(Book => {
            /** If the current `ISBN` and the current `Content` are not in the set already,
             * then they are not duplicates, so add them to the set and the noDupObj array.
             */
            if (!ISBNSet.has(Book.ISBN) && !contentSet.has(Book.Content)) {
                noDupObj.push(Book);
                ISBNSet.add(Book.ISBN);
                contentSet.add(Book.Content);
            }
        });
    }

    noDupObj.forEach(Book => {
        /** Create a set to store previous `Text` properties. */
        var textSet = new Set();
        var newContent = [];
        Book.Content.forEach(Line => {
            /** If the current `Text` is not in the set already, then it is not a duplicate
             * element, so add them to the textSet and the newContent array.
             */
            if (!textSet.has(Line.Text)) {
                newContent.push(Line);
                textSet.add(Line.Text);
            }
        });
        /** Set the newContent as the `Content` for the current Book, since this is now a
         * duplicate-free `Content` array. 
         */
        Book.Content = newContent;
    });

    return noDupObj;
 }


/**
 * Searches for matches in scanned text.
 * @param {string} searchTerm - The word or term we're searching for. 
 * @param {JSON} scannedTextObj - A JSON object representing the scanned text.
 * @returns {JSON} - Search results.
 * */ 
 function findSearchTermInBooks(searchTerm, scannedTextObj) {
    /** You will need to implement your search and 
     * return the appropriate object here. */

    var newScannedTextObj = removeDuplicates(scannedTextObj);

    var result = {
        "SearchTerm": "",
        "Results": []
    };

    result.SearchTerm = searchTerm;

    /** Scanned text without improper format or duplicates must have at least one book to search for text */
    if (newScannedTextObj.length > 0) {
        newScannedTextObj.forEach(Book => {
            /** A book's `Content` must have at least one scanned line to search for text. */
            if (Book.Content.length > 0) {
                Book.Content.forEach(Line => {
                    /** If the current Line's `Text` property includes the search Term then this is a match
                     * and we need to push it to the result.Results array.
                     */
                    if (Line.Text.includes(searchTerm)) {
                        result.Results.push({"ISBN": Book.ISBN, "Page": Line.Page, "Line": Line.Line });
                    }
                });
            }
        });
    }
 
    return result; 
}

/** Example blank object. */
const blankObject = [
    {
        "Title": "",
        "ISBN": "",
        "Content": [
            {
                "Page": "",
                "Line": "",
                "Text": "",
            }
        ] 
    }
]

/** Example input object. */
const twentyLeaguesIn = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Example input object with duplicate of the same scanned objects */
const dupScannedObject = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Example input object with duplicate scanned lines of text in the same scanned object. */
const dupContent = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]

/** Example input object with duplicate scanned objects with duplicate scanned lines 
 * of text in the same scanned object. */
const dupObjectContent = [
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    },
    {
        "Title": "Twenty Thousand Leagues Under the Sea",
        "ISBN": "9780000528531",
        "Content": [
            {
                "Page": 31,
                "Line": 8,
                "Text": "now simply went on by her own momentum.  The dark-"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 9,
                "Text": "ness was then profound; and however good the Canadian\'s"
            },
            {
                "Page": 31,
                "Line": 10,
                "Text": "eyes were, I asked myself how he had managed to see, and"
            } 
        ] 
    }
]
    
/** Example output object */
const twentyLeaguesOut = {
    "SearchTerm": "the",
    "Results": [
        {
            "ISBN": "9780000528531",
            "Page": 31,
            "Line": 9
        }
    ]
}

/*
 _   _ _   _ ___ _____   _____ _____ ____ _____ ____  
| | | | \ | |_ _|_   _| |_   _| ____/ ___|_   _/ ___| 
| | | |  \| || |  | |     | | |  _| \___ \ | | \___ \ 
| |_| | |\  || |  | |     | | | |___ ___) || |  ___) |
 \___/|_| \_|___| |_|     |_| |_____|____/ |_| |____/ 
                                                      
 */

/** We can check that, given a known input, we get a known output. This also tests
 * for case-sensitivity.
 */
const test1result = findSearchTermInBooks("the", twentyLeaguesIn);
if (JSON.stringify(twentyLeaguesOut) === JSON.stringify(test1result)) {
    console.log("PASS: Test 1");
} else {
    console.log("FAIL: Test 1");
    console.log("Expected:", twentyLeaguesOut);
    console.log("Received:", test1result);
}

/** We could choose to check that we get the right number of results. */
const test2result = findSearchTermInBooks("the", twentyLeaguesIn); 
if (test2result.Results.length == 1) {
    console.log("PASS: Test 2");
} else {
    console.log("FAIL: Test 2");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test2result.Results.length);
}


/** We can check that an empty searchTerm and empty object will return nothing. */
const test3result = findSearchTermInBooks("", {});
if (test3result.Results.length == 0) {
    console.log("PASS: Test 3");
} else {
    console.log("FAIL: Test 3");
    console.log("Expected: 0");
    console.log("Received:", test3result.Results.length);
}

/** We can check that an empty searchTerm and array with empty object will return nothing. */
const test4result = findSearchTermInBooks("", [{}])
if (test4result.Results.length == 0) {
    console.log("PASS: Test 4");
} else {
    console.log("FAIL: Test 4")
    console.log("Expected: 0");
    console.log("Received:", test4result.Results.length);
}

/** We can check that an empty searchTerm and an actual scannedTextObj with empty 
 * values will return nothing, since there is nothing to be found. */
const test5result = findSearchTermInBooks("", blankObject);
if (test5result.Results.length == 0) {
    console.log("PASS: Test 5");
} else {
    console.log("FAIL: Test 5");
    console.log("Expected: 1");
    console.log("Received:", test5result.Results.length);
}


/** We can check whether the scannedTextObj having multiples of the same object is ignored. */
const test6result = findSearchTermInBooks("the", dupScannedObject);
if (test6result.Results.length == 1) {
    console.log("PASS: Test 6");
} else {
    console.log("FAIL: Test 6");
    console.log("Expected: 1");
    console.log("Recevied:", test6result.Results.length);
}

/** We can check whether the scannedTextObj having multiple of the same scanned lines is ignored. */
const test7result = findSearchTermInBooks("the", dupContent);
if (test7result.Results.length == 1) {
    console.log("PASS: Test 7");
} else {
    console.log("FAIL: Test 7");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test7result.Results.length);
}

/** We can check whether the scannedTextObj having multiple of the same objects with the same scanned
 * lines is ignored.
 */
const test8result = findSearchTermInBooks("the", dupObjectContent);
if (test8result.Results.length == 1) {
    console.log("PASS: Test 8");
} else {
    console.log("FAIL: Test 8");
    console.log("Expected:", twentyLeaguesOut.Results.length);
    console.log("Received:", test8result.Results.length);
    console.log(test8result);
}