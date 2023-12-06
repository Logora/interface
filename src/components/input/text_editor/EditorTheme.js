import styles from './TextEditor.module.scss';

const exampleTheme = {
    ltr: styles.ltr,
    rtl: styles.rtl,
    placeholder: styles.editorPlaceholder,
    paragraph: styles.editorParagraph,
    quote: styles.editorQuote,
    heading: {
      h1: styles.editorHeadingH1,
      h2: styles.editorHeadingH2,
      h3: styles.editorHeadingH3,
      h4: styles.editorHeadingH4,
      h5: styles.editorHeadingH5
    },
    list: {
      nested: {
        listitem: styles.editorNestedListItem,
      },
      ol: styles.editorListOl,
      ul: styles.editorListUl,
      listitem: styles.editorListItem
    },
    image: styles.editorTextImage,
    link: styles.editorTextLink,
    text: {
      bold: styles.editorTextBold,
      italic: styles.editorTextItalic,
      overflowed: styles.editorTextOverflowed,
      hashtag: styles.editorTextHashtag,
      underline: styles.editorTextUnderline,
      strikethrough: styles.editorTextStrikethrough,
      underlineStrikethrough: styles.editorTextUnderlineStrikethrough,
      code: styles.editorTextCode
    },
    code: styles.editorCode,
    codeHighlight: {
      atrule: styles.editorTokenAttr,
      attr: styles.editorTokenAttr,
      boolean: styles.editorTokenProperty,
      builtin: styles.editorTokenSelector,
      cdata: styles.editorTokenComment,
      char: styles.editorTokenSelector,
      class: styles.editorTokenFunction,
      "class-name": styles.editorTokenFunction,
      comment: styles.editorTokenComment,
      constant: styles.editorTokenProperty,
      deleted: styles.editorTokenProperty,
      doctype: styles.editorTokenComment,
      entity: styles.editorTokenOperator,
      function: styles.editorTokenFunction,
      important: styles.editorTokenVariable,
      inserted: styles.editorTokenSelector,
      keyword: styles.editorTokenAttr,
      namespace: styles.editorTokenVariable,
      number: styles.editorTokenProperty,
      operator: styles.editorTokenOperator,
      prolog: styles.editorTokenComment,
      property: styles.editorTokenProperty,
      punctuation: styles.editorTokenPunctuation,
      regex: styles.editorTokenVariable,
      selector: styles.editorTokenSelector,
      string: styles.editorTokenSelector,
      symbol: styles.editorTokenProperty,
      tag: styles.editorTokenProperty,
      url: styles.editorTokenOperator,
      variable: styles.editorTokenVariable
    }
  };
  
export default exampleTheme;