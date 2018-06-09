const reloquent = require('../src/')

reloquent.askQuestions({
  singleQuestion: {
    text: 'This is meant to be a single question. Single just like me.',
    validation: () => {
      console.log('oh no you don\'t have to say anything, it\'s OK.')
    },
    defaultValue: true,
    postProcess: () => 'programming is art',
  },
}, null, 'singleQuestion')
  .then((res) => {
    console.log(res)
  })
