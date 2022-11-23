import type { AutosuggestResponseSearchSuggestions } from '../../../../../api-client/src/autosuggestAPI/types';

export interface urlConstructor {
    BASE_URL: string
}
export interface SearchPanelProps {
    /**
     * Accessibility label
     */
    ariaLabel: string,
    /**
     * Enable / disable browser autocomplete
     */
    autocomplete: string,

    /**
     * Enable / disable browser autoCorrect
     */
    autoCorrect: string,
    /**
     * defines form type
     */
    formType: string,
    /**
     * Image Height
     */
    iconHeight: number,
    /**
     * Image Widths
     */
    iconWidth: number,
    /**
     * sets condition whether autocomplete is open or closed
     */
    isOpen?: string,
    /**
     * Sets minChars for autocomplete to be invoked
     */
    minChars: number,
    /**
     * Sets minvalue for autocomplete to be invoked
     */
    minLength: number,
    /**
     * name value for html block
     */
    name: string,
    /**
     * Text for search-bar placeholder
     */
    placeholder?: string,
    /**
     * div id for search-bar
     */
    role: string,
    /**
     * Whether to show the reset button
     */
    showReset?: boolean;
    /**
     * Whether to show the submit button
     */
    showSubmit?: boolean;
    /**
     * Product Suggestions
     */
    suggestions?: AutosuggestResponseSearchSuggestions[]

} typeof {};

