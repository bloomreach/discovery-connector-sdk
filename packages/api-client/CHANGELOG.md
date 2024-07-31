# Change Log

All notable changes to this project will be documented in this file.

## [2.1.0] - 2024-07-15

### Changed

Add support for V3 Facet response.

## [2.0.0] - 2022-07-20

### Changed

Complete refactoring of the module. Main changes:
- Node v16+
- Typescript v4.7.2
- Rollup bundler
- Linting

Add support for Dynamic Grouping feature.

## [1.2.1] - 2022-04-13

### Changed

Fix issue about not being able to override endpoint and fields settings for widgets.

## [1.2.0] - 2022-03-16

### Changed

From now on some widget related properties are read from the object under the `widget` property in the `connectorConfig` object instead of their standalone propery. The related properties are:

- `widget_endpoint` -> `widget.endpoint`
- `widget_fields` -> `widget.fields`

Example:

Old format:
```
bloomreachConnector.config = {
  widget_endpoint: '...',
  widget_fields: '...',
  // ...
}
```

New format:
```
bloomreachConnector.config = {
  widget: {
    endpoint: '...',
    fields: '...',
  }
  // ...
}
```
