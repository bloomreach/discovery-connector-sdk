BUGS
1. CSS on keydown not functioning
   UI Enhancements
1. Ensure frontend elements are configurable by users inheriting library
   placeholder
   css values
2. Add a configurable item for number of options rendered maxVisible
   Reference Doc https://bestofreactjs.com/repo/fmoo-react-typeahead-react-autocomplete
   customClasses
   inputProps
   onBlur
   onFocus
   onOptionSelected
   caseInsensitive - allows config for whether the setup is caseSensitive or not
3. Add a minChars configuration that will only show autocompletion option list after this many characters have been typed after the trigger character.
   Reference Dochttps://github.com/yury-dymov/react-autocomplete-input/blob/master/src/AutoCompleteTextField.js

4. Evaluate window resizing
   componentDidMount() {
   window.addEventListener('resize', this.handleResize);
   }

   componentWillUnmount() {
   window.removeEventListener('resize', this.handleResize);
   }
5. Consider setting up Autosuggest client
   Reference Doc https://github.com/AmyShackles/react-autosuggestions/blob/main/src/components/AutoSuggestClient.js

6. Break apart the various components such as the option vs options containers
   Reference Doc https://github.com/AmyShackles/react-autosuggestions/blob/main/src/components/AutoSuggestClient.js
