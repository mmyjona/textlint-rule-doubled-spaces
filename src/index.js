const { matchPatterns } = require("@textlint/regexp-string-matcher");

const defaultOptions = {
  allow: [],
}

export default function(context, options = {}) {
  const {Syntax, RuleError, report, getSource} = context;
  const allow = options.allow ?? defaultOptions.allow;
  return {
    [Syntax.Str](node){
      const text = getSource(node);
      const allowMatch = matchPatterns(text, allow);
      const regexSpaces = /[\s　]{2,}/g;
      while (true ) {
        const matches = regexSpaces.exec(text)
        if (!matches) break;
        const isAllow = allowMatch.some(m => m.startIndex < matches.index && matches.index < m.endIndex);
        if (!isAllow) {
          report(node, new RuleError("发现重复空格。", { index: matches.index }));
        }
      }
      const regexDoubleChineseChar = /([\u4e00-\u9fa5]+)\1+/g;
      while (true ) {
        const matches = regexDoubleChineseChar.exec(text)
        if (!matches) break;
        const isAllow = allowMatch.some(m => m.startIndex < matches.index && matches.index < m.endIndex);
        if (!isAllow) {
          report(node, new RuleError(`发现重复中文字符\"${matches[0]}\"。`, { index: matches.index }));
        }
      }
    }
  }
};
