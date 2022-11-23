# Get Search Results API
Returns Product, Category, or Content indexed results depending on the `search_type` specified.

---

# Table of Contents
- [Features](#features)
- [Usage](#usage)
- [API Documentation](#api-documentation)


# Features

### Product Search
Product Search API sends a keyword query to retrieve results about products and other content on your site. You can apply additional filters and facets to return products and content that either include or exclude specified attributes like colors and brands.

### Category Search
The Category API sends a category query to retrieve results about products within the categories that you specify.

[Click here for information on searching `Category Trees`](https://documentation.bloomreach.com/discovery/reference/search-category-trees)

# API Design

---
### Language
Typescript v4.7+

### Design Pattern
Functional Programming function that calls the `fetch()` api

### Response 
Typed .json as a promise

# Usage

---
### Client Side
1. Import the function `getSearchResults` into your component.


2. Pass the query params specified in the interface `GetSearchResultsRequest` to the API as `requestParams`









### Querying using Special Characters
All non-alphanumeric characters (any character other than 0-9, and A-Z) are considered special characters. Bloomreach treats special characters as blank spaces by default and ignores accents (for example, "résumé" would be treated as "resume"). This applies to Search, Synonyms, and Autosuggest.

# API Documentation

---

**[Click Here to view API Documentation](https://documentation.bloomreach.com/discovery/reference/autosuggest-api)**

# Feature Roadmap

---
### http/2
**CURRENT STATE**
All responses are returned via http/1.1 protocol

**FUTURE STATE**
All responses will be returned via http/2

### Compression
**CURRENT STATE**
All responses are returned via http/1.1 protocol

**FUTURE STATE**
All responses will be returned via http/2


