import { PARAMETER_NAME_FILTERS_PANEL } from '../../constants';
import { updateParameterInUrl } from '../../utils';

function buildSidebarControlButtonClickHandler() {
  return () => {
    const sidebarContentElement = document.querySelector(
      '.blm-product-search-sidebar-content'
    );
    if (sidebarContentElement?.classList.contains('blm-open')) {
      sidebarContentElement?.classList.remove('blm-open');
      document.body.classList.remove('blm-out-of-view');
      updateParameterInUrl(PARAMETER_NAME_FILTERS_PANEL, '');
    } else {
      document.body.classList.add('blm-out-of-view');
      sidebarContentElement?.classList.add('blm-open');
      updateParameterInUrl(
        PARAMETER_NAME_FILTERS_PANEL,
        'on'
      );
    }
  };
}

export function addSidebarControlButtonClickListener() {
  const sidebarControlButtons = document.querySelectorAll(
    '.blm-product-search-control-button--sidebar'
  );

  sidebarControlButtons.forEach((button) => {
    if (!button.getAttribute('hasListener')) {
      button.addEventListener(
        'click',
        buildSidebarControlButtonClickHandler()
      );
      button.setAttribute('hasListener', 'true');
    }
  });
}
