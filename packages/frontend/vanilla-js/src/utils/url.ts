import { PARAMETER_NAME_FACETS } from '../constants';
import { getCurrentSearchRequestState } from '../modules/builders';

export function updateUrl(urlParameters: URLSearchParams) {
  const historyStateObject: { [key: string]: string } = {};
  // eslint-disable-next-line functional/no-loop-statement
  for (const pair of urlParameters.entries()) {
      historyStateObject[pair[0]] = pair[1];
  }
  window.history.pushState(
      historyStateObject,
      document.title,
      `?${urlParameters.toString()}`
  );
}

export function updateMultipleInstanceParametersInUrl(
  parameterName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parameters: { [key: string]: any } | any[],
  userOptions?: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valueSerializer?: (parameterValue: any) => string;
      nameValueSeparator?: string;
  }
): void {
  const defaultOptions = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      valueSerializer: (parameterValue: any) =>
          parameterValue.toString().replace(/"/g, '\\"'),
      nameValueSeparator: ':',
  };
  const options = {
      ...defaultOptions,
      ...userOptions,
  };
  const urlParameters = new URLSearchParams(window.location.search);
  urlParameters.delete(parameterName);

  if (Array.isArray(parameters)) {
      parameters.forEach((value) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          urlParameters.append(parameterName, options.valueSerializer(value));
      });
  } else {
      Object.keys(parameters).forEach((key) => {
          urlParameters.append(
              parameterName,
              `${key}${options.nameValueSeparator}${options.valueSerializer(
                  parameters[key]
              )}`
          );
      });
  }

  updateUrl(urlParameters);
}

export function updateParameterInUrl(
  parameterName: string,
  newValue: string | ((value: string) => string)
): void {
  const urlParameters = new URLSearchParams(window.location.search);
  if (typeof newValue === 'function') {
      urlParameters.set(
          parameterName,
          // @ts-ignore
          newValue(urlParameters.get(parameterName)).replace(/"/g, '\\"')
      );
  } else if (newValue === '') {
      urlParameters.delete(parameterName);
  } else {
      urlParameters.set(parameterName, newValue.replace(/"/g, '\\"'));
  }

  updateUrl(urlParameters);
}

export function incrementParameterInUrl(parameterName: string): void {
  updateParameterInUrl(parameterName, (oldValue) => {
      if (!oldValue) return '2';
      let newValue = Number.parseInt(oldValue, 10);
      return (++newValue).toString();
  });
}

export function decrementParameterInUrl(parameterName: string): void {
  updateParameterInUrl(parameterName, (oldValue) => {
      if (!oldValue) return '1';
      let newValue = Number.parseInt(oldValue, 10);
      return (--newValue).toString();
  });
}

export function buildPriceUrlParameterObject(): { price?: string } {
  const currentSearchRequestState = getCurrentSearchRequestState();

  const priceRangeLowerBoundaryInput = document.querySelector(
    '.blm-price-range-input--lower'
  );
  const priceRangeUpperBoundaryInput = document.querySelector(
    '.blm-price-range-input--upper'
  );

  let lowerBoundary = parseFloat((priceRangeLowerBoundaryInput as HTMLInputElement).value);
  let upperBoundary = parseFloat((priceRangeUpperBoundaryInput as HTMLInputElement).value);

  if (lowerBoundary === upperBoundary) {
    if (upperBoundary === currentSearchRequestState.price_range_max_value) {
      lowerBoundary -= 1;
    } else {
      upperBoundary += 1;
    }
  }

  if (
    upperBoundary === currentSearchRequestState.price_range_max_value &&
    Number(lowerBoundary) === 0
  ) {
    return {};
  }

  return {
    price: `${lowerBoundary},${upperBoundary}`
  };
}

export function getFacetsFromUrl(): {[key: string]: string[]} {
  return new URLSearchParams(window.location.search)
    .getAll(PARAMETER_NAME_FACETS)
    .reduce(
      (all, current) => ({
        ...all,
        [current.split(':')[0] || '']: (current.split(':')[1] || '').split(',')
      }),
      {}
    );
}

export function getSelectedColors(): string[] {
  const selectedFacetValues = getFacetsFromUrl();
  return Object.keys(selectedFacetValues).reduce(
    (colors: string[], key) => {
      if (key.toLowerCase() === 'color') {
        colors = (selectedFacetValues[key] || []).map((color) => color.toLowerCase());
      }
      return colors;
    },
    []
  );
}
