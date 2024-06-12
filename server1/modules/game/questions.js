const questions = require("./questions.json");

/**
 * questions Interface
 * {['normal' | 'final']: [
  {category:string,
question: string,
answer: string,
alternateSpellings: string[],
suggestions: : string[]}
,... ]
}
 */
const getQuestions = () => {
  let openingQs = questions.normal;
  // let finalQs = questions.final;
  //TODO: fix/ create game implementation
  // for now it only returns the first Q.

  // TODO: later in not MVP version: handle alternateSpellings(in questions.json)// maybe use above commented code

  return openingQs;
};


module.exports = {
  getQuestions
}
