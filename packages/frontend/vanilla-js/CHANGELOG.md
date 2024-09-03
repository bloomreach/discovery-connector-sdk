# Change Log

All notable changes to this project will be documented in this file.

## [3.1.2] - 2024-08-29

### Fixed

Remove the useless `sort` parameter from autosuggest to avoid potential [API issues](https://bloomreach.atlassian.net/browse/PJSALVAGE-17).

## [3.1.1] - 2024-08-12

### Fixed

Fix Pathways & Recommendations widgets not picking up the `fields` config.

## [3.1.0] - 2024-07-15

### Changed

Add support for V3 Facet response.

## [3.0.0] - 2022-07-20

### Changed

Complete refactoring of the module. Main changes:
- Node v16+
- Typescript v4.7.2
- Rollup bundler
- Linting

Scroll to top when page changed in pagination.
Restore scroll position when going back to search results page.
Fix keyword redirection.
Add Clear All button for selected facets.
Show selected facets at top of sidebar.
Add search bar for facet values at top of sidebar.
Add support for price to change on product card as different swatch images are selected.
Partial support for Dynamic Grouping feature (no pagination at the moment).
Support for Realtime Customer Segments.

## [2.1.1] - 2022-04-13

### Changed

Fix issue about not being able to override endpoint and fields settings in Pathways and Recommendations module.

## [2.1.0] - 2022-03-16

### Changed

Extract widget template into external file and make it configurable through the connector config object.

## [2.0.9] - 2022-02-16

### Changed

Pass specific module configuration from the connector object to the API client class.

## [2.0.8] - 2022-01-31

### Changed

Fixed duplicated request issue and incorrect page size on infinite scrolling.

## [2.0.7] - 2022-01-25

### Changed

Fixed the typo of the version number in the README.md file.

## [2.0.6] - 2022-01-21

### Changed

In Product Search and Category modules:

- Remove scroll to top on performing search event in Category and Product Search modules.

## [2.0.5] - 2021-11-16

### Changed

In Product Search and Category modules:

- Fix incorrect scrolling behaviour when sorting was changed after some previous scroll events.
- Refactor swatch loading function and infinite scroll loading size and loading indicator resetting functions.

## [2.0.4] - 2021-11-10

### Changed

- Automate build artifacts renaming and packaging.
- Fix stuck infinite scroll results when initial result set is loaded faster than scroll position watching.

## [2.0.3] - 2021-10-28

### Changed

Fix infinite scroll by adding "rows" parameter to API requests in Product Search and Category modules.

## [2.0.2] - 2021-10-27

### Changed

Making number formatting consistent by fixing numbers to 2 decimal points everywhere.
Change Product Events module's directory name back to `product-events` for backward compatibility.

## [2.0.1] - 2021-10-15

### Changed

In the new, separated structure:
Fix infinite scroll issue by passing the money formatting method to the API results in the initiateScroll method as well.

## [2.0.0] - 2021-10-12

### Changed

Separate API client and view layer.
Refactor codebase extensively.

## [1.3.2] - 2021-10-15

### Changed

Fix infinite scroll issue by passing the money formatting method to the API results in the initiateScroll method as well.

## [1.3.1] - 2021-10-04

### Changed

Store templates in separate files and publish them in the build process.

## [1.3.0] - 2021-09-17

### Changed

If there is a not-null value on the `brSegmentation` key in localStorage:

- Add its value with a `seg:` prefix to the `brSeg` URL parameter in API calls in Product Search, Category and Pathways & Recommendations modules
- Add its value URL encoded in the format of `&brSeg=<SegmentValue>` to the `url` URL parameter in API calls in Product Search, Category and Pathways & Recommendations modules
- Populate its value into the `window.br_data` object's `customer_profile` property for pixel firing
- Add its value with a `customer_profile:` prefix to the `segment` URL parameter in API calls in Product Search and Category modules

## [1.2.2] - 2021-09-20

### Changed

Encode multi-value facet value parts between ampersands.
Properly encode facet values with double quotes and comma character.
Scroll to the top after every search event, like at selecting/deselecting a facet value.

## [1.2.1] - 2021-09-16

### Changed

Fix event listener stacking issues of price range selector, page size selector, sort selector and pagination buttons.

Make the facet labels a little bit narrower to fix a design issue for a certain long label.

## [1.2.0] - 2021-09-16

### Changed

Make price range selector use `stats` attribute values and smaller steps in Products Search and Category modules.

## [1.1.0] - 2021-08-18

### Changed

Change response mapping to pass all the attributes from the JSON response to the template data object in these files:

- src/utils/object-mappers/autosuggest/mapper.ts
- src/utils/object-mappers/category/mapper.ts
- src/utils/object-mappers/pathways-and-recommendations/mapper.ts
- src/utils/object-mappers/product-search/mapper.ts

Also updated the automated tests in the directories of the files above.
