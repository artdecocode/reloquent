const reloquent = require('../src/')

const questions = {
    title: {
        text: 'Title: ',
        validation: (a) => {
            if (!a) {
                throw new Error('Please enter a title.')
            }
        },
    },
    description: {
        text: 'Description: ',
        postProcess: s => s.trim(),
        defaultValue: '',
    },
    date: {
        text: 'Date: ',
        getDefault: () => {
            return new Promise((resolve) => {
                setTimeout(() => resolve(Date.now()), 200)
            })
        },
    },
}

reloquent.askQuestions(questions)
    .then((answers) => {
        console.log(answers)
    })
