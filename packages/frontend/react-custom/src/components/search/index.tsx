// search/index.tsx

import styles from '../../styles/Search.module.css';
import type { SearchPanelProps } from './types';
import type { FunctionalComponent } from 'preact';
import { Fragment, h } from 'preact';
import { useEffect, useState } from 'preact/compat';
import {
  getSuggestions,
  escapeSpecialCharacters,
  extractTrackingCookie,
  generateRequestId,
} from '../../../../../api-client/src/index';
import type {AutosuggestResponseSearchSuggestions} from '../../../../../api-client/src/autosuggestAPI';

/**
 * The search box and autocomplete UI components
 * @param props - Render control props set in header component
 * @returns jsx rendering element
 */
export const SearchComponent: FunctionalComponent<SearchPanelProps> = (props) => {
    const [suggestions, setSuggestions] = useState([] as AutosuggestResponseSearchSuggestions[]);
    const [suggestionIndex, setSuggestionIndex] = useState(0);
    const [suggestionsActive, setSuggestionsActive] = useState(false);
    const [input, setInput] = useState('');
    /**
     * Returns filtered suggestions based on what the user enters as their search
     *
     */

// todo refactor to not try to call api for suggestions until there are 2 char or more, and show suggestions
    const suggestionQueryParams =
  {
      account_id: 6702,
      auth_key: '3ggj32eqbeqaahsa',
      _br_uid_2: '',
      catalog_views: 'documentation_site',
      // https://documentation.bloomreach.com/discovery/reference/bloomreach-search-and-merchandising-apis
      // Input is defined as dynamic value in useEffect
      q: '',
    // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
      ref_url: window.location.href,
      request_id: 0,
      request_type: 'suggest',
    // eslint-disable-next-line ssr-friendly/no-dom-globals-in-react-fc
      url: window.location.href,
  };
  useEffect(() => {
         /**
       * Callback to resolve the promise from getSuggestions()
       * @remarks Use of the `.then()` syntax resolves the promise.
       * Be sure to access the resolve value in the callback function
       */
         // Dynamically sets the queryParams, sets the entered value as lower case and escapes special character
         suggestionQueryParams.q = escapeSpecialCharacters(input);
         // Dynamically creates a random requestID
         suggestionQueryParams.request_id = generateRequestId();
         // Checks for the presence of the Bloomreach cookie, and if one is not found, will apply default
         suggestionQueryParams._br_uid_2 = extractTrackingCookie();
         getSuggestions(suggestionQueryParams).then((value => {
          // @ts-ignore
           const suggestion:AutosuggestResponseSearchSuggestions[] = value?.suggestionGroups?.[0]?.searchSuggestions;
          console.log(suggestion, 'suggestion onFetch');
          setSuggestions(suggestion);
          suggestion?.length > 1 ? setSuggestionsActive(true) : setSuggestionsActive(false);
          return suggestion;
        })).catch(e => {
          console.log(e);
        });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [input]);

    /**
      * @remarks
     * On Click Handler, which is wrapped in "useEffect" function so that the
     * method "setDropDownOpen" can be used outside the render function.
     * ***NOTE*** preact uses onInput instead of onChange as the default function
     */
    const onInput = (event): void => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        setInput(event.target.value); // event to capture the changed value and to assign to lower case
        // performs a search when the input length is greater than 1
        console.log(`search input has been changed to ${input}`);

    };

    /**
     * Sets the new search value as the textID of the selected object
     */
        // todo set the focus on the search input bar once the user clicks on their selection
    const onClick = (event) => {
            setSuggestions([]); // sets the filtered suggestion on click to null
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            setInput(event.target.innerText); // sets the value in the search box as the clicked value
            setSuggestionsActive(false);
        };

    /**
     * Handler to support keyboard interactions with autocomplete suggestions & results
     * @param e - event handling
     */
        // todo remediate bug associated with key listeners not working
    const onKeyDown = (e) => {
            // User pressed the enter key
            if (e.keyCode === 13) {
                e.preventDefault(); // prevents default browser action
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
              // todo set input to accept value from arrow up or down
              // setInput();
                setSuggestionIndex(0);
                setSuggestionsActive(false);

             // User pressed the up arrow
             // todo fix issue where highliting is not working on key up / down
            } else if (e.keyCode === 38) {
                console.log('user has pressed the up arrow');
                if (suggestionIndex === 0) {
                    return;
                }
                setSuggestionIndex(suggestionIndex - 1);

                // User pressed the down arrow
            } else if (e.keyCode === 40) {
                e.preventDefault();
                console.log('user has pressed the down arrow');
                if (suggestionIndex - 1 === suggestions.length) {
                    return;
                }
                setSuggestionIndex(suggestionIndex + 1);
            }
        };
    /**
     * Preact component that will provide the autocomplete suggestions list & results
     * or "no results" when there are no matches found
     * @remarks Utilizing suggestion.pid as the "key" given it is the best option to utilize unique value
     */
    const SuggestionsComponent: FunctionalComponent = () => {
        return suggestions.length ? (
          <>
            <ul className={styles.suggestions}>
                {suggestions.map((suggestion, index: number) => {
                    return (
                        <li className={index === suggestionIndex ? 'active' : ''}
                            key={suggestion.pid}
                            onClick={onClick}
                        >
                            {suggestion.title}
                        </li>
                    );
                })}
            </ul>
          </>
        ) : (

          // The false conditions when nothing matches
          <>
            <div className="no-suggestions">
                <span role="img" aria-label="tear emoji">
                  😪
                </span>{' '}
                <em>sorry no suggestions</em>
            </div>
          </>

        );

    };

    return (
        <Fragment>
            <div className={styles.search}>
                <form
                    action=""
                    role={props.role}>
                    <input
                        aria-label="search"
                        autoComplete="off"
                        autoCorrect="none"
                        data-minChars={2}
                        name="q"
                        onInput={onInput}
                        onKeyDown={onKeyDown}
                        minLength={2}
                        placeholder="Search..."
                        type="search"
                        value={input}
                    />
                </form>
                {suggestionsActive && input && <SuggestionsComponent />}
            </div>
        </Fragment>
    );

};
export default SearchComponent;
