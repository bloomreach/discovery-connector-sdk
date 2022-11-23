function buildSwatchElementHoverListener(dependencies: {
  result: Element,
  // @ts-ignore
  swatchItems: NodeListOf<Element>,
  swatchIndex: number
}) {
  const { result, swatchItems, swatchIndex } = dependencies;
  return (event: Event) => {
    swatchItems.forEach(swatchItem => {
      swatchItem.classList.remove('active');
    });
    (event.target as HTMLElement).classList.add('active');

    // Update image
    const imageContainer = result.querySelectorAll(
      '.blm-product-search-image-container'
    );
    imageContainer.forEach(imageItems => {
      imageItems.querySelectorAll(
        '.blm-product-search-swatch-image'
      ).forEach((image: HTMLElement, i) => {
        image.style.display = 'none';
        if (swatchIndex === i) {
          image.style.display = 'block';
        }
      });
    });

    // Update price
    result.querySelectorAll(
      '.blm-product-search-details-container__price'
    ).forEach((price: HTMLElement, index) => {
      price.classList.remove('active');
      if (swatchIndex === index) {
        price.classList.add('active');
      }
    });
  };
}

export function addSwatchElementHoverListener() {
  document.querySelectorAll('.blm-product-search__result').forEach(result => {
    const swatchContainers = result.querySelectorAll(
      '.blm-product-search-swatch-container'
    );
    swatchContainers.forEach(swatchContainer => {
      const swatchItems = swatchContainer.querySelectorAll(
        '.blm-product-search-swatch-container__swatch'
      );
      swatchItems.forEach((swatchItem, swatchIndex) => {
        if (!swatchItem.getAttribute('hasListener')) {
          swatchItem.addEventListener('mouseover', buildSwatchElementHoverListener({
            result,
            swatchItems,
            swatchIndex
          }));
          swatchItem.setAttribute('hasListener', 'true');
        }
      });
    });
  });
}
