# Autosuggest API
Autosuggest guides site visitors by providing search term suggestions, which are sometimes called autocomplete or type-ahead, in a dropdown list as visitors type in a search box.

---

# Table of Contents
- [Features](#features)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Feature Roadmap](#feature-roadmap)


# Features

---
### Autosuggest Products

Typically, Bloomreach returns the product URL in the suggest API response and automatically adds the _br_psugg_q attribute. However, you need to confirm that the final URL for the product page includes this parameter, and append it to the URL if it's absent.

**[Click Here for more information](https://documentation.bloomreach.com/discovery/reference/autosuggest-products)**


### Autosuggest Categories
If an autosuggest query includes categories, then the response includes an attributeSuggestions array.



**[Click Here for more information](https://documentation.bloomreach.com/discovery/reference/autosuggest-categories)**

# API Design

---
### Language
Typescript v4.7+

### Design Pattern
Functional Programming function that calls the `fetch()` api

### Response
**Format:** Typed .json via a typescript promise
**Compression:** gzip <br>
**Protocol:** http/2



# Usage

---
## Client Side API call
1. Import the function `getSuggestionResults` into your component


2. Pass the query params specified in the interface `GetSuggestionsRequest` to the API as `requestParams`
```javascript
const suggestionQueryParams =
  {
      account_id: 6702,
      auth_key: '3ggj32eqbeqaahsa',
      _br_uid_2: 'uid%3D7797686432023%3Av%3D11.5%3Ats%3D1428617911187%3Ahc%3D55',
      catalog_views: 'documentation_site',
      // https://documentation.bloomreach.com/discovery/reference/bloomreach-search-and-merchandising-apis
      // Input is defined as dynamic value in useEffect
      q: '',
      ref_url: 'http://localhost',
      request_id: '',
      request_type: 'suggest',
      url: 'http://localhost',
  };
```

3. Call the API function to return / consume the response
```javascript

import {
  getSuggestions,
  escapeSpecialCharacters,
  extractTrackingCookie,
  generateRequestId,
} from '@bloomreach/discovery-api-client';
import type {AutosuggestResponseSearchSuggestions} from '@bloomreach/discovery-api-client';

         // Dynamically sets the queryParams, sets the entered value as lower case and escapes special character
         suggestionQueryParams.q = escapeSpecialCharacters(input);
         // Dynamically creates a random requestID
         suggestionQueryParams.request_id = generateRequestId();
         // Checks for the presence of the Bloomreach cookie, and if one is not found, will apply default
         suggestionQueryParams._br_uid_2 = extractTrackingCookie();
         getSuggestions(suggestionQueryParams).then((value => {
          const suggestion:AutosuggestResponseSearchSuggestions[] = value?.suggestionGroups?.[0]?.searchSuggestions;
          console.log(suggestion, 'suggestion onFetch');
          return suggestion;
        })).catch(e => {
          console.log(e);
        });
```
## Utility Functions

### Default Response

* By default, the response includes a maximum of 8 products. 
* Keyword suggestions are in the `querySuggestions` field 
* Product suggestions are in the `searchSuggestions` field.


### Querying using Special Characters
The SDK provides a function, `escapeSpecialCharacters()`, that can be used to escape special characters from the search input.

### Generating unique RequestID
The SDK provides a function, `generateRequestID()`, that can be used to generate the recommended 13 character randomized / unique parameter `request_id`
See API documentation for more info on the `request_id`


### Extracting `_br_uid_2` cookie ID
The SDK provides a function, `extractTrackingCookie()`, that can be used to check for the presence of the `_br_uid_2` cookie, and if one is not found, the function will return the default value provided in the API Documentation

[Click Here to Learn More about the handling of special characters](https://documentation.bloomreach.com/discovery/reference/bloomreach-search-and-merchandising-apis#sending-special-characters-in-q-parameter-in-the-api)
# API Documentation

---

**[Click Here to view API Documentation](https://documentation.bloomreach.com/discovery/reference/autosuggest-api)**

# Feature Roadmap

---

### Improved Compression via Brotli
#### **CURRENT STATE**

All responses are compressed using gzip format & algorithm

#### **FUTURE STATE**
All responses are compressed using brotli format & algorithm
