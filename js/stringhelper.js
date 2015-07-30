/**helper functions*/
YoastSEO_StringHelper = function() {};
/**
 * removes strings from array and replaces them with keyword.
 * @param textString
 * @param stringsToRemove []
 * @param replacement (default == space)
 * @returns {textString}
 */
YoastSEO_StringHelper.prototype.replaceString = function( textString, stringsToRemove, replacement ){
    if( typeof replacement === "undefined" ){
        replacement = " ";
    }
    textString = textString.replace( this.stringToRegex(stringsToRemove), replacement );
    return this.stripSpaces( textString );
};

/**
 * matches string with given array of strings to match.
 * @param textString
 * @param stringsToMatch
 * @returns {matches}
 */
YoastSEO_StringHelper.prototype.matchString = function( textString, stringsToMatch ){
    return textString.match( this.stringToRegex( stringsToMatch, false ) );
};

/**
 * checks if the match on textStrings is not null. If it has matches returns the length.
 * Otherwise it returns 0 (no matches).
 * @param textString
 * @param regex
 * @returns {number}
 */
YoastSEO_StringHelper.prototype.countMatches = function( textString, regex ){
    return textString.match( regex ) !== null ? textString.match.length : 0;
};

/**
 * builds regex from array with strings
 * @param stringArray
 * @returns {RegExp}
 */
YoastSEO_StringHelper.prototype.stringToRegex = function( stringArray, disableWordBoundary ){
    var regexString = "";
    var wordBoundary = "\\b";
    if( disableWordBoundary ){
        wordBoundary = "";
    }
    for( var i = 0; i < stringArray.length; i++ ){
        if(regexString.length > 0){ regexString += "|"; }
        regexString += wordBoundary+stringArray[i]+wordBoundary;
    }
    return new RegExp( regexString, "g" );
};

/**
 * Strip extra spaces, replace duplicates with single space. Remove space at front / end of string
 * @param textString
 * @returns textString
 */
YoastSEO_StringHelper.prototype.stripSpaces = function( textString ) {
    //replace multiple spaces with single space
    textString = textString.replace( / {2,}/g, " " );
    //remove first/last character if space
    textString = textString.replace( /^\s+|\s+$/g, "" );
    return textString;
};



/**
 * Checks if the stringhelper is already initialized. Returns stringHelper.
 * @returns {YoastSEO_StringHelper}
 */
stringHelper = function() {
    if ( typeof yst_stringHelper !== "object" ){
        yst_stringHelper = new YoastSEO_StringHelper();
    }
    return yst_stringHelper;
};